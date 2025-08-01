
from django.urls import path
from .views import Note_Delete, Register, Note_Create,Note_Update
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('signup/', Register.as_view(), name='signup'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('notes_create/', Note_Create.as_view(), name='note_create_list'),
    path('notes/<int:pk>/', Note_Update.as_view(), name='note_update'),
    path('notes_delete/<int:pk>/', Note_Delete.as_view(), name='note_delete'),
]
