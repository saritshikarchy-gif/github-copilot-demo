from bson import ObjectId
from django.conf import settings
from django.core.management.base import BaseCommand
from pymongo import MongoClient

from octofit_tracker import test_data
from octofit_tracker.models import Activity, Leaderboard, Team, User, Workout


class Command(BaseCommand):
    help = 'Populate the database with test data for users, teams, activity, leaderboard, and workouts'

    def handle(self, *args, **kwargs):
        db_settings = settings.DATABASES['default']
        client = MongoClient(db_settings['HOST'], db_settings['PORT'])
        db = client[db_settings['NAME']]

        # delete_many keeps the collections' indexes, unlike drop()
        for collection in ('users', 'teams', 'activity', 'leaderboard', 'workouts'):
            db[collection].delete_many({})

        users = {}
        for data in test_data.USERS:
            users[data['username']] = User.objects.create(_id=ObjectId(), **data)

        for data in test_data.TEAMS:
            team = Team.objects.create(_id=ObjectId(), name=data['name'])
            for username in data['members']:
                team.members.add(users[username])

        for data in test_data.ACTIVITIES:
            Activity.objects.create(
                _id=ObjectId(),
                user=users[data['user']],
                activity_type=data['activity_type'],
                duration=data['duration'],
            )

        for data in test_data.LEADERBOARD:
            Leaderboard.objects.create(_id=ObjectId(), user=users[data['user']], score=data['score'])

        for data in test_data.WORKOUTS:
            Workout.objects.create(_id=ObjectId(), **data)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data.'))
