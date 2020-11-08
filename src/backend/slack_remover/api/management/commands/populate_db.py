from api.models import Channel, SlackUser
from api.slack_wrapper import SlackWrapper
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    client = SlackWrapper()

    def populate_users(self):
        for user in self.client.get_users():
            try:
                SlackUser.objects.get_or_create(
                    slack_id=user["id"],
                    name=user["real_name"],
                    email=user["profile"]["email"],
                    avatar=user["profile"]["image_72"],
                )
            except KeyError:
                continue

    def populate_channels(self):
        for channel in self.client.get_channels():
            Channel.objects.get_or_create(
                slack_id=channel["id"],
                name=channel["name"],
            )

    def handle(self, *args, **options):
        self.populate_channels()
        self.populate_users()
