from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime
from django.utils import timezone


class UserModelTest(TestCase):
    """Test the User model"""
    
    def setUp(self):
        self.user = User.objects.create(
            name='Test Hero',
            email='testhero@test.com',
            team='Test Team',
            total_points=100
        )
    
    def test_user_creation(self):
        """Test that a user can be created"""
        self.assertEqual(self.user.name, 'Test Hero')
        self.assertEqual(self.user.email, 'testhero@test.com')
        self.assertEqual(self.user.total_points, 100)
    
    def test_user_string_representation(self):
        """Test the string representation of a user"""
        self.assertEqual(str(self.user), 'Test Hero')


class TeamModelTest(TestCase):
    """Test the Team model"""
    
    def setUp(self):
        self.team = Team.objects.create(
            name='Test Team',
            total_points=500,
            member_count=5
        )
    
    def test_team_creation(self):
        """Test that a team can be created"""
        self.assertEqual(self.team.name, 'Test Team')
        self.assertEqual(self.team.total_points, 500)
        self.assertEqual(self.team.member_count, 5)
    
    def test_team_string_representation(self):
        """Test the string representation of a team"""
        self.assertEqual(str(self.team), 'Test Team')


class ActivityModelTest(TestCase):
    """Test the Activity model"""
    
    def setUp(self):
        self.activity = Activity.objects.create(
            user_email='testhero@test.com',
            activity_type='Running',
            duration=30,
            points=50,
            date=timezone.now(),
            notes='Morning run'
        )
    
    def test_activity_creation(self):
        """Test that an activity can be created"""
        self.assertEqual(self.activity.user_email, 'testhero@test.com')
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.duration, 30)
        self.assertEqual(self.activity.points, 50)


class APIRootTest(APITestCase):
    """Test the API root endpoint"""
    
    def test_api_root(self):
        """Test that the API root returns all available endpoints"""
        url = reverse('api-root')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)


class UserAPITest(APITestCase):
    """Test the User API endpoints"""
    
    def setUp(self):
        self.user = User.objects.create(
            name='API Test Hero',
            email='apitest@test.com',
            team='Test Team',
            total_points=150
        )
    
    def test_get_users_list(self):
        """Test retrieving the list of users"""
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_get_user_detail(self):
        """Test retrieving a single user"""
        url = reverse('user-detail', kwargs={'pk': self.user._id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'API Test Hero')


class TeamAPITest(APITestCase):
    """Test the Team API endpoints"""
    
    def setUp(self):
        self.team = Team.objects.create(
            name='API Test Team',
            total_points=1000,
            member_count=10
        )
    
    def test_get_teams_list(self):
        """Test retrieving the list of teams"""
        url = reverse('team-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class WorkoutAPITest(APITestCase):
    """Test the Workout API endpoints"""
    
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Test Workout',
            description='A test workout',
            difficulty='medium',
            duration=45,
            category='Cardio',
            points_value=75
        )
    
    def test_get_workouts_list(self):
        """Test retrieving the list of workouts"""
        url = reverse('workout-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_get_workout_detail(self):
        """Test retrieving a single workout"""
        url = reverse('workout-detail', kwargs={'pk': self.workout._id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test Workout')
