from django.contrib import admin
from django.urls import path, include, re_path

from .views import login

urlpatterns = [
    path('kakao/login/', login.kakao_login),
    path('kakao/login/callback/', login.kakao_callback),
    path('kakao/login/delete/', login.kakao_delete),
]