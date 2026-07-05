from .serializers import (UserSerializer, EmailLoginSerializer, VerifyOTPSerializer, 
    LogoutSerializer, ChangePasswordSerializer, ForgotPasswordSerializer, 
    ChangeForgottenPasswordSerializer, UserProfileSerializer
)
from .models import User, UserProfile
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        serializer.save()
        
        return Response(
            {'message': 'user succcessfully signed up'},
            status=status.HTTP_201_CREATED
        )


class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer
    
    def get_object(self):
        return self.request.user.userprofile



class EmailLoginView(generics.GenericAPIView):
    serializer_class = EmailLoginSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response(
            {
                "message": "OTP sent successfully",
                "email": user.email
            },
            status=status.HTTP_200_OK
        )
        

class VerifyOTPView(generics.GenericAPIView):
    serializer_class = VerifyOTPSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        return Response(data, status=status.HTTP_200_OK)
    
    
    
class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LogoutSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            {'message': 'Successfully logged out'},
            status=status.HTTP_200_OK
        )
        
        

class ChangePasswordView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'message': 'Password changed successfully'},
            status=status.HTTP_200_OK
        )
        
        
class ForgotPassword(generics.GenericAPIView):
    serializer_class = ForgotPasswordSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        
        return Response(
            data,
            status=status.HTTP_200_OK
        )
        
        
        
class ChangeForgottenPasswordView(generics.GenericAPIView):
    serializer_class = ChangeForgottenPasswordSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'message': 'Password changed successfully'},
            status=status.HTTP_200_OK
        )
             