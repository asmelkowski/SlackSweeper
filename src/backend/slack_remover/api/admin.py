from django.contrib import admin

from api.models import Channel, SlackUser, Whitelist

# Register your models here.

admin.site.register(SlackUser)
admin.site.register(Channel)
admin.site.register(Whitelist)
