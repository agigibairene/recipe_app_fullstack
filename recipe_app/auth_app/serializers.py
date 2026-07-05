from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.utils import timezone
from django.core.mail import send_mail
from random import randint
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta
from rest_framework_simplejwt.exceptions import TokenError
from .models import UserProfile


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    email = serializers.EmailField(
        error_messages={
            "unique": "An account with this email already exists."
        }
    )

    username = serializers.CharField(
        error_messages={
            "unique": "This username is already taken."
        }
    )
    
    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'password', 'confirm_password']
        
    def validate(self, attrs):
        password = attrs['password']
        confirm_password = attrs['confirm_password']
        
        if password != confirm_password:
            raise serializers.ValidationError({
                'confirm_password': 'Passwords do not match'
            })
        
        return attrs
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('An account already exist')
        return value
        
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
    

class UserProfileSerializer(serializers.ModelSerializer):
    class  Meta:
        model = UserProfile
        fields = ['profile_photo', 'bio', 'achievements']
        
        

class EmailLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        email = attrs['email']
        password = attrs['password']
        
        user = authenticate(
            username=email,
            password=password
        )
        
        if not user:
            raise serializers.ValidationError(
                {'User does not exist'}
            )
        
        attrs['user'] = user
        return attrs
            
    def create(self, validated_data):
        user = validated_data['user']
        
        otp = str(randint(100000, 999999))
        otp_created_at = timezone.now()
        user.otp = otp
        user.otp_created_at = otp_created_at
        
        user.save()
        
        send_mail(
            subject='Hello',
            message=f'This is the OTP {otp}',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=False
        )
        
        return user
    


class VerifyOTPSerializer(serializers.Serializer):
    otp = serializers.CharField()
    email = serializers.EmailField()
    
    def validate(self, attrs):
        email = attrs['email']
        otp = attrs['otp']
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid email or OTP')
            
        if user.otp != otp:
            raise serializers.ValidationError('Invalid OTP')
        
        if timezone.now() > user.otp_created_at + timedelta(minutes=5):
            raise serializers.ValidationError('OTP has expired')
        
        attrs['user'] = user
        
        return attrs
    
    
    def create(self, validated_data):
        user = validated_data['user']
        
        
        token = RefreshToken.for_user(user)
        user.otp = None
        user.otp_created_at = None
        user.save(update_fields=["otp", "otp_created_at"])

        return {
            'refresh_token': str(token),
            'access_token': str(token.access_token),
            'user': UserSerializer(user).data
        }
        
        
        
class LogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()
    
    def validate(self, attrs):
        token = attrs['refresh_token']
        
        try:
            token = RefreshToken(token)
            token.blacklist()
        except TokenError:
            raise serializers.ValidationError('Invalid token')
        
        return attrs


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        user = self.context['request'].user
        old_password = attrs['old_password']
        new_password = attrs['new_password']
        
        if not user.check_password(old_password):
            raise serializers.ValidationError('Old password is incorrect')
        
        if old_password == new_password:
            raise serializers.ValidationError('New password must differ from old password')
            
        attrs['user'] = user
        return attrs
    
    
    def save(self):
        user = self.validated_data['user']
        new_password = self.validated_data['new_password']
        user.set_password(new_password)
        user.save()
        return user
        
        
        
        
class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    
    def validate(self, attrs):
        email = attrs['email']
        
        try:
            user = User.objects.get(email=email)                
            
        except User.DoesNotExist:
            user = None
        
        attrs['user'] = user
        return attrs
    
    
    def create(self, validated_data):
        user = validated_data['user']
        
        if not user:
            return {'message': 'If this email exists, you will receive an OTP'}

        
        otp = str(randint(100000, 999999))
        user.otp = otp
        user.otp_created_at = timezone.now()
        
        user.save()
        send_mail(
            subject='Hello',
            message=f'This is the OTP {otp}',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=False
        )
        
        return {'message': 'If this email exists, you will receive an OTP'}



class ChangeForgottenPasswordSerializer(serializers.Serializer):
    otp = serializers.CharField(max_length=6)
    email = serializers.EmailField()
    new_password = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        otp = attrs['otp']
        email = attrs['email']
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid OTP or email')
        
        if user.otp != otp:
            raise serializers.ValidationError('Invalid OTP ')
        
        if timezone.now() > user.otp_created_at + timedelta(minutes=5):
            raise serializers.ValidationError('OTP has expired') 
        
        attrs['user'] = user
        return attrs
    
    
    def save(self, **kwargs):
        user = self.validated_data['user']
        
        user.otp = None
        user.otp_created_at = None
        
        new_password = self.validated_data['new_password']
        user.set_password(new_password)
        
        user.save()
        
        return user
        