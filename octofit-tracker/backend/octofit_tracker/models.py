from djongo import models


class User(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.username


class Team(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    members = models.ArrayReferenceField(to=User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'teams'

    def __str__(self):
        return self.name


class Activity(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=100)
    duration = models.DurationField()

    class Meta:
        db_table = 'activity'

    def __str__(self):
        return f'{self.user} - {self.activity_type}'


class Leaderboard(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()

    class Meta:
        db_table = 'leaderboard'

    def __str__(self):
        return f'{self.user} - {self.score}'


class Workout(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        db_table = 'workouts'

    def __str__(self):
        return self.name
