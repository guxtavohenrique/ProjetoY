from django.shortcuts import render
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.views import APIView
from .models import Photo
from .serializers import PhotoSerializer, RegisterSerializer
from django.contrib.auth.models import User

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class PhotoListCreateView(generics.ListCreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PhotoDownloadView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        photo = get_object_or_404(Photo, pk=pk)
        return FileResponse(photo.image.open("rb"), as_attachment=True)