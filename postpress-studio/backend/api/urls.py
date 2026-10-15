from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import RegisterView, PhotoListCreateView, PhotoDownloadView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", TokenObtainPairView.as_view()),
    path("photos/", PhotoListCreateView.as_view()),
    path("photos/<int:pk>/download/", PhotoDownloadView.as_view()),
]