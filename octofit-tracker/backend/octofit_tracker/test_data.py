from datetime import timedelta

USERS = [
    {'username': 'thundergod', 'email': 'thundergod@mhigh.edu', 'password': 'thundergodpassword'},
    {'username': 'metalgeek', 'email': 'metalgeek@mhigh.edu', 'password': 'metalgeekpassword'},
    {'username': 'zerocool', 'email': 'zerocool@mhigh.edu', 'password': 'zerocoolpassword'},
    {'username': 'crashoverride', 'email': 'crashoverride@mhigh.edu', 'password': 'crashoverridepassword'},
    {'username': 'sleeptoken', 'email': 'sleeptoken@mhigh.edu', 'password': 'sleeptokenpassword'},
]

TEAMS = [
    {'name': 'Blue Team', 'members': ['thundergod', 'metalgeek', 'zerocool']},
    {'name': 'Gold Team', 'members': ['crashoverride', 'sleeptoken']},
]

ACTIVITIES = [
    {'user': 'thundergod', 'activity_type': 'Cycling', 'duration': timedelta(hours=1)},
    {'user': 'metalgeek', 'activity_type': 'Crossfit', 'duration': timedelta(hours=2)},
    {'user': 'zerocool', 'activity_type': 'Running', 'duration': timedelta(hours=1, minutes=30)},
    {'user': 'crashoverride', 'activity_type': 'Strength', 'duration': timedelta(minutes=30)},
    {'user': 'sleeptoken', 'activity_type': 'Swimming', 'duration': timedelta(hours=1, minutes=15)},
]

LEADERBOARD = [
    {'user': 'thundergod', 'score': 100},
    {'user': 'metalgeek', 'score': 90},
    {'user': 'zerocool', 'score': 95},
    {'user': 'crashoverride', 'score': 85},
    {'user': 'sleeptoken', 'score': 80},
]

WORKOUTS = [
    {'name': 'Cycling Training', 'description': 'Training for a road cycling event'},
    {'name': 'Crossfit', 'description': 'Training for a crossfit competition'},
    {'name': 'Running Training', 'description': 'Training for a marathon'},
    {'name': 'Strength Training', 'description': 'Training for strength'},
    {'name': 'Swimming Training', 'description': 'Training for a swimming competition'},
]
