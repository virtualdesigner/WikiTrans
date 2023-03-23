from rest_framework import serializers
from .models import Project, Sentence
from django.contrib.auth.models import User


class ProjectSerializer(serializers.ModelSerializer):
    assigned_to = serializers.ListField(child=serializers.CharField())

    class Meta:
        model = Project
        fields = ('project_id', 'created_by', 'assigned_to',
                  'created_at', 'wiki_title', 'target_lang')
        primary_key = 'project_id'
        
        
class SentenceSerializer(serializers.ModelSerializer):
    project_id = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())

    class Meta:
        model = Sentence
        fields = ('sentence_id', 'project_id', 'original_sentence',
                  'translated_sentence', 'created_at')
        extra_kwargs = {
            'translated_sentence': {'required': False}
        }
        primary_key = 'sentence_id'


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'groups')
        primary_key = 'id'