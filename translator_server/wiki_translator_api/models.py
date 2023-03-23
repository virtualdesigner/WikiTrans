from django.db import models
# from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

class Project(models.Model):
    project_id = models.CharField(primary_key=True, max_length=200)
    created_by = models.CharField(max_length=100)
    # assigned_to = models.ForeignKey(User, on_delete=models.CASCADE)
    assigned_to = models.JSONField()
    wiki_title = models.CharField(max_length=200)
    target_lang = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
class Sentence(models.Model):
    sentence_id = models.CharField(primary_key=True, max_length=200)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    original_sentence = models.CharField(max_length=1000)
    translated_sentence = models.CharField(max_length=1000, blank=True, null=True, default=None)
    created_at = models.DateTimeField(auto_now_add=True)