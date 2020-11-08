from rest_framework import serializers
from rest_framework.response import Response

from api.models import Channel, SlackUser, Whitelist


class SlackUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlackUser
        fields = "__all__"


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = "__all__"


class ChannelUpdateSerializer(serializers.Serializer):
    slack_id = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    whitelist = serializers.ListField(write_only=True)

    class Meta:
        model = Channel

    def get_slack_id(self, obj):
        return obj.slack_id

    def get_name(self, obj):
        return obj.name

    def update(self, instance, validated_data):
        new_users = [
            SlackUser.objects.get(slack_id=slack_id)
            for slack_id in validated_data.get("whitelist")
        ]
        instance.whitelist.set(new_users)
        instance.save()
        return instance


class WhitelistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Whitelist
        fields = "__all__"
