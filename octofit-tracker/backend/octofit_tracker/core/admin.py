from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'team', 'total_points', 'created_at']
    list_filter = ['team', 'created_at']
    search_fields = ['name', 'email']
    ordering = ['-total_points']


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'total_points', 'member_count', 'created_at']
    search_fields = ['name']
    ordering = ['-total_points']


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['user_email', 'activity_type', 'duration', 'points', 'date']
    list_filter = ['activity_type', 'date']
    search_fields = ['user_email', 'activity_type']
    ordering = ['-date']


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ['rank', 'user_name', 'team', 'total_points', 'last_updated']
    list_filter = ['team']
    search_fields = ['user_name', 'user_email']
    ordering = ['rank']


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['name', 'difficulty', 'duration', 'category', 'points_value']
    list_filter = ['difficulty', 'category']
    search_fields = ['name', 'category']
    ordering = ['name']
