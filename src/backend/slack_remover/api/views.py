from django.core import serializers
from django.http import JsonResponse
from django.views import View
from rest_framework import generics, mixins, permissions, viewsets
from rest_framework.response import Response

from api.models import Channel, SlackUser, Whitelist
from api.serializers import (
    ChannelSerializer,
    ChannelUpdateSerializer,
    SlackUserSerializer,
    WhitelistSerializer,
)


class SlackUserViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = SlackUser.objects.all()
    serializer_class = SlackUserSerializer


class ChannelViewSet(
    generics.ListAPIView,
    generics.UpdateAPIView,
    generics.RetrieveAPIView,
    viewsets.GenericViewSet,
):

    queryset = Channel.objects.all()

    def get_serializer_class(self):
        if self.action in ("partial_update", "update"):
            return ChannelUpdateSerializer
        else:
            return ChannelSerializer


class WhitelistViewSet(viewsets.ModelViewSet):

    queryset = Whitelist.objects.all()
    serializer_class = WhitelistSerializer
