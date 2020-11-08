from django.conf import settings
from slack import WebClient


class SlackWrapper:
    slack_client = WebClient(token=settings.SLACK_TOKEN)

    def get_channels(self):
        resp = self.slack_client.conversations_list(types="public_channel")
        if resp["ok"] == True:
            return resp["channels"]
        return {}

    def get_users(self):
        resp = self.slack_client.users_list()
        if resp["ok"] == True:
            return resp["members"]
        return {}
