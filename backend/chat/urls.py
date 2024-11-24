from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    MyTokenObtainPairView,
    createRoom,
    room,
    createUser
)

urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh_view'),
    path('room/', createRoom, name="createRoom"),
    path('room/<str:name>/<str:password>/', room, name="room"),
    path('user/create/', createUser, name='create-user'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_URL)

