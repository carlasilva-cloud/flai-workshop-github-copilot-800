from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from core.models import User, Team, Activity, Leaderboard, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        self.stdout.write(self.style.SUCCESS('Existing data cleared.'))
        
        # Create Teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            total_points=0,
            member_count=0
        )
        team_dc = Team.objects.create(
            name='Team DC',
            total_points=0,
            member_count=0
        )
        self.stdout.write(self.style.SUCCESS('Teams created.'))
        
        # Create Marvel Users
        self.stdout.write('Creating Marvel heroes...')
        marvel_users = [
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team': 'Team Marvel', 'total_points': 450},
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': 'Team Marvel', 'total_points': 520},
            {'name': 'Captain America', 'email': 'captainamerica@marvel.com', 'team': 'Team Marvel', 'total_points': 480},
            {'name': 'Black Widow', 'email': 'blackwidow@marvel.com', 'team': 'Team Marvel', 'total_points': 410},
            {'name': 'Thor', 'email': 'thor@marvel.com', 'team': 'Team Marvel', 'total_points': 490},
            {'name': 'Hulk', 'email': 'hulk@marvel.com', 'team': 'Team Marvel', 'total_points': 470},
        ]
        
        for user_data in marvel_users:
            User.objects.create(**user_data)
        
        # Create DC Users
        self.stdout.write('Creating DC heroes...')
        dc_users = [
            {'name': 'Superman', 'email': 'superman@dc.com', 'team': 'Team DC', 'total_points': 500},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': 'Team DC', 'total_points': 510},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team': 'Team DC', 'total_points': 485},
            {'name': 'The Flash', 'email': 'flash@dc.com', 'team': 'Team DC', 'total_points': 530},
            {'name': 'Aquaman', 'email': 'aquaman@dc.com', 'team': 'Team DC', 'total_points': 420},
            {'name': 'Green Lantern', 'email': 'greenlantern@dc.com', 'team': 'Team DC', 'total_points': 460},
        ]
        
        for user_data in dc_users:
            User.objects.create(**user_data)
        
        self.stdout.write(self.style.SUCCESS('Users created.'))
        
        # Update team stats
        team_marvel.member_count = len(marvel_users)
        team_marvel.total_points = sum(u['total_points'] for u in marvel_users)
        team_marvel.save()
        
        team_dc.member_count = len(dc_users)
        team_dc.total_points = sum(u['total_points'] for u in dc_users)
        team_dc.save()
        
        # Create Activities
        self.stdout.write('Creating activities...')
        all_users = marvel_users + dc_users
        activity_types = ['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'Boxing']
        
        for i, user_data in enumerate(all_users):
            for j in range(3):  # 3 activities per user
                Activity.objects.create(
                    user_email=user_data['email'],
                    activity_type=activity_types[(i + j) % len(activity_types)],
                    duration=30 + (j * 15),
                    points=50 + (j * 25),
                    date=timezone.now() - timedelta(days=j),
                    notes=f"{user_data['name']}'s {activity_types[(i + j) % len(activity_types)].lower()} session"
                )
        
        self.stdout.write(self.style.SUCCESS('Activities created.'))
        
        # Create Leaderboard
        self.stdout.write('Creating leaderboard...')
        all_users_sorted = sorted(all_users, key=lambda x: x['total_points'], reverse=True)
        
        for rank, user_data in enumerate(all_users_sorted, start=1):
            Leaderboard.objects.create(
                user_email=user_data['email'],
                user_name=user_data['name'],
                team=user_data['team'],
                total_points=user_data['total_points'],
                rank=rank
            )
        
        self.stdout.write(self.style.SUCCESS('Leaderboard created.'))
        
        # Create Workouts
        self.stdout.write('Creating workouts...')
        workouts = [
            {
                'name': 'Super Soldier Training',
                'description': 'Intense military-style workout combining strength and endurance',
                'difficulty': 'hard',
                'duration': 60,
                'category': 'Strength',
                'points_value': 100
            },
            {
                'name': 'Web-Slinger Cardio',
                'description': 'High-intensity cardio session inspired by aerial acrobatics',
                'difficulty': 'medium',
                'duration': 45,
                'category': 'Cardio',
                'points_value': 75
            },
            {
                'name': 'Amazonian Warrior Workout',
                'description': 'Combat-focused training with strength and agility exercises',
                'difficulty': 'hard',
                'duration': 55,
                'category': 'Strength',
                'points_value': 95
            },
            {
                'name': 'Speed Force Sprint',
                'description': 'Ultra-fast running intervals to build explosive speed',
                'difficulty': 'medium',
                'duration': 30,
                'category': 'Cardio',
                'points_value': 60
            },
            {
                'name': 'Zen Master Yoga',
                'description': 'Peaceful yoga session for flexibility and mental clarity',
                'difficulty': 'easy',
                'duration': 40,
                'category': 'Flexibility',
                'points_value': 50
            },
            {
                'name': 'Gamma Strength Training',
                'description': 'Extreme powerlifting workout for maximum muscle gain',
                'difficulty': 'hard',
                'duration': 50,
                'category': 'Strength',
                'points_value': 90
            },
            {
                'name': 'Atlantean Swimming',
                'description': 'Aquatic workout building endurance and full-body strength',
                'difficulty': 'medium',
                'duration': 45,
                'category': 'Cardio',
                'points_value': 70
            },
            {
                'name': 'Dark Knight Combat',
                'description': 'Mixed martial arts training with tactical elements',
                'difficulty': 'hard',
                'duration': 60,
                'category': 'Combat',
                'points_value': 100
            },
        ]
        
        for workout_data in workouts:
            Workout.objects.create(**workout_data)
        
        self.stdout.write(self.style.SUCCESS('Workouts created.'))
        
        # Summary
        self.stdout.write(self.style.SUCCESS('\n' + '='*50))
        self.stdout.write(self.style.SUCCESS('Database population completed!'))
        self.stdout.write(self.style.SUCCESS(f'Teams: {Team.objects.count()}'))
        self.stdout.write(self.style.SUCCESS(f'Users: {User.objects.count()}'))
        self.stdout.write(self.style.SUCCESS(f'Activities: {Activity.objects.count()}'))
        self.stdout.write(self.style.SUCCESS(f'Leaderboard entries: {Leaderboard.objects.count()}'))
        self.stdout.write(self.style.SUCCESS(f'Workouts: {Workout.objects.count()}'))
        self.stdout.write(self.style.SUCCESS('='*50))
