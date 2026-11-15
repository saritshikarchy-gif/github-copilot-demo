from bson import ObjectId
from bson.errors import InvalidId
from rest_framework import serializers

from .models import Activity, Leaderboard, Team, User, Workout


class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        try:
            return ObjectId(data)
        except (InvalidId, TypeError):
            raise serializers.ValidationError('Invalid ObjectId.')


def user_reference(**kwargs):
    return serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), pk_field=ObjectIdField(), **kwargs
    )


class UserSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)

    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}


class TeamSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)
    members = user_reference(many=True)

    class Meta:
        model = Team
        fields = ['_id', 'name', 'members']


class ActivitySerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)
    user = user_reference()

    class Meta:
        model = Activity
        fields = ['_id', 'user', 'activity_type', 'duration']


class LeaderboardSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)
    user = user_reference()

    class Meta:
        model = Leaderboard
        fields = ['_id', 'user', 'score']


class WorkoutSerializer(serializers.ModelSerializer):
    _id = ObjectIdField(read_only=True)

    class Meta:
        model = Workout
        fields = ['_id', 'name', 'description']
