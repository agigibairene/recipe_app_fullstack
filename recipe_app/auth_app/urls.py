from django.urls import path
from .views import (RegisterUserView, EmailLoginView, UserProfileView, VerifyOTPView, 
    LogoutView, ChangeForgottenPasswordView, ChangePasswordView, ForgotPassword
)

urlpatterns = [
    path('signup/', RegisterUserView.as_view(), name='signup'),
    path('login/', EmailLoginView.as_view(), name='login'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('forgot-password/', ForgotPassword.as_view(), name='forgot-password'),
    path('reset-password/', ChangeForgottenPasswordView.as_view(), name='reset-password'),
    path('user/profile/', UserProfileView.as_view(), name='user-profile'),
]