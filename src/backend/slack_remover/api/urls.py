from django.urls import include, path
from rest_framework import routers

from api import views

router = routers.DefaultRouter()
router.register(r"users", views.SlackUserViewSet)
router.register(r"channels", views.ChannelViewSet)
router.register(r"whitelists", views.WhitelistViewSet)

urlpatterns = [path("", include(router.urls))]
