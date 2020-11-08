import time

from api.models import Channel
from django.conf import settings
from django.core.management.base import BaseCommand
from slack import WebClient


class Command(BaseCommand):
    help = "Slack Sweeper worker."

    slack_client = WebClient(token=settings.SLACK_TOKEN)

    def get_channel_whitelist(self, slack_id):
        return [
            user.slack_id
            for user in Channel.objects.get(slack_id=slack_id).whitelist.all()
        ]

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("Starting the worker!"))
        while True:
            try:
                slack_channels = self.slack_client.conversations_list(
                    types="public_channel"
                )["channels"]
                for channel in slack_channels:
                    for msg in self.slack_client.conversations_history(
                        channel=channel["id"]
                    )["messages"]:
                        whitelist = self.get_channel_whitelist(channel["id"])
                        if msg["user"] not in whitelist:
                            self.slack_client.chat_delete(
                                channel=channel["id"], ts=msg["ts"]
                            )
                time.sleep(5)
            except KeyboardInterrupt:
                self.stdout.write(self.style.SUCCESS("Stopping the worker!"))
                break
