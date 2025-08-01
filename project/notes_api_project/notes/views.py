
from rest_framework import generics, permissions
from .models import Note
from .serializers import NoteSerializer, UserSerializer
from django.utils import timezone
from datetime import timedelta



class Register(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = []


class Note_Create(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]



    def get_queryset(self):
        cutoff = timezone.now() - timedelta(seconds=60)
        return Note.objects.filter(user=self.request.user, created_at__gte=cutoff)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        

class Note_Update(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)     


class Note_Delete(generics.DestroyAPIView):
    queryset = Note.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        instance.delete()