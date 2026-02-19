import os
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Configure base URL for Codespaces or localhost
codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'teams', views.TeamViewSet, basename='team')
router.register(r'activities', views.ActivityViewSet, basename='activity')
router.register(r'leaderboard', views.LeaderboardViewSet, basename='leaderboard')
router.register(r'workouts', views.WorkoutViewSet, basename='workout')

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('', views.api_root, name='api-root'),
    path('', include(router.urls)),
]
