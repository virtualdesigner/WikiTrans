from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Project, Sentence

admin.site.register([Project, Sentence])