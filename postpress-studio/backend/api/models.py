from django.db import models
from django.contrib.auth.models import User

class Photo(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="photos")
    title = models.CharField(max_length=120, blank=True)
    image = models.ImageField(upload_to="photos/")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        