from django.db import models


# Create your models here.
class SlackUser(models.Model):
    slack_id = models.CharField(max_length=16, primary_key=True)
    name = models.CharField(max_length=64)
    email = models.EmailField()
    avatar = models.URLField()

    def __str__(self):
        return self.name


class Whitelist(models.Model):
    name = models.CharField(max_length=64)
    users = models.ManyToManyField("SlackUser", blank=True, related_name="whitelists")
    channels = models.ManyToManyField("Channel", blank=True, related_name="whitelists")

    def __str__(self):
        return self.name


class Channel(models.Model):
    slack_id = models.CharField(max_length=16, primary_key=True)
    name = models.CharField(max_length=64)
    whitelist = models.ManyToManyField("SlackUser", blank=True)

    def __repr__(self):
        return self.name
