from datetime import timedelta

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Activity, Leaderboard, Team, User, Workout


class ApiRootTests(APITestCase):
    def test_api_root_lists_all_endpoints(self):
        response = self.client.get(reverse('api-root'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for name in ('users', 'teams', 'activities', 'leaderboard', 'workouts'):
            self.assertIn(f'api/{name}/', response.data[name])


class CollectionApiTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='thundergod', email='thundergod@mhigh.edu', password='thundergodpassword'
        )

    def test_users(self):
        response = self.client.get(reverse('user-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual([u['username'] for u in response.data], ['thundergod'])
        self.assertNotIn('password', response.data[0])

    def test_create_user(self):
        response = self.client.post(
            reverse('user-list'),
            {'username': 'metalgeek', 'email': 'metalgeek@mhigh.edu', 'password': 'pw'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)

    def test_teams(self):
        team = Team.objects.create(name='Blue Team')
        team.members.add(self.user)

        response = self.client.get(reverse('team-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['name'], 'Blue Team')
        self.assertEqual(response.data[0]['members'], [str(self.user.pk)])

    def test_activities(self):
        Activity.objects.create(user=self.user, activity_type='Cycling', duration=timedelta(hours=1))

        response = self.client.get(reverse('activity-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['activity_type'], 'Cycling')
        self.assertEqual(response.data[0]['user'], str(self.user.pk))

    def test_leaderboard(self):
        Leaderboard.objects.create(user=self.user, score=100)

        response = self.client.get(reverse('leaderboard-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['score'], 100)

    def test_workouts(self):
        Workout.objects.create(name='Cycling Training', description='Training for a road cycling event')

        response = self.client.get(reverse('workout-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['name'], 'Cycling Training')


class CorsTests(APITestCase):
    def test_cors_headers_allow_any_origin(self):
        response = self.client.get(reverse('api-root'), HTTP_ORIGIN='http://localhost:3000')
        self.assertEqual(response['Access-Control-Allow-Origin'], '*')

    def test_preflight_allows_methods_and_headers(self):
        response = self.client.options(
            reverse('user-list'),
            HTTP_ORIGIN='http://localhost:3000',
            HTTP_ACCESS_CONTROL_REQUEST_METHOD='POST',
            HTTP_ACCESS_CONTROL_REQUEST_HEADERS='x-custom-header',
        )
        self.assertIn('POST', response['Access-Control-Allow-Methods'])
        self.assertEqual(response['Access-Control-Allow-Headers'], '*')
