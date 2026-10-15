from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Photo

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, data):
        return User.objects.create_user(**data)

class PhotoSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Photo
        fields = ["id", "title", "image", "owner", "created_at"]