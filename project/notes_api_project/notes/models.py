

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return timezone.now() > self.created_at + timedelta(seconds=60)

    def __str__(self):
        return f"Note by {self.user.username}"
      