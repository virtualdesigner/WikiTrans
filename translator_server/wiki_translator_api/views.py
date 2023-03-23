from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth.models import User, Group
import uuid
from wikipediaapi import Wikipedia
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView

from .serializers import ProjectSerializer, UserSerializer, SentenceSerializer
from .models import Project, Sentence
from .utils.split_sentences import split_sentences


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username
        data['groups'] = self.user.groups.values_list('name', flat=True)
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CreateProjectView(generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        project_serializer = ProjectSerializer(data=request.data)
        user = self.request.user
        if project_serializer.is_valid() and user.groups.filter(name='Manager').exists():
            project_serializer.save()
            wiki_summary = Wikipedia().page(project_serializer.data.get('wiki_title')).summary
            sentence_array = split_sentences(wiki_summary)
            for sentence in sentence_array:
                sentence_data = {"project_id": project_serializer.instance.pk, "sentence_id": str(
                    uuid.uuid4()), "original_sentence": sentence, "translated_sentence": None}
                sentence_serializer = SentenceSerializer(data=sentence_data)
                sentence_serializer.is_valid(raise_exception=True)
                sentence_serializer.save()

            return Response(project_serializer.data, status=status.HTTP_201_CREATED)
        return Response(project_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateSentenceView(generics.UpdateAPIView):
    queryset = Sentence.objects.all()
    serializer_class = SentenceSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def put(self, request, *args, **kwargs):
        try:
            sentences = request.data

            for sentence in sentences:
                project = Project.objects.get(project_id=sentence['project_id'])
                project = {'project_id': project.project_id, 'created_by': project.created_by, 'created_at': project.created_at, 'assigned_to': project.assigned_to, 'wiki_title': project.wiki_title, 'target_lang': project.target_lang}
                if (not self.request.user.username in project['assigned_to']) and (not self.request.user.username == project['created_by']):
                    return Response("You're not allowed to add translation for this project", status=status.HTTP_400_BAD_REQUEST)
                existing_sentence = Sentence.objects.get(sentence_id=sentence['sentence_id'])
                sentence_serializer = SentenceSerializer(existing_sentence, data=sentence, partial=True)
                sentence_serializer.is_valid(raise_exception=True)
                sentence_serializer.save(project=project)
            return Response({'message': 'Sentences updated successfully.'}, status=status.HTTP_200_OK)
        except None:
            return Response(sentence_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListProjectView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        username = self.request.user.username
        return Project.objects.filter(Q(assigned_to__icontains=username) | Q(created_by=username)).distinct()


class ListUserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        group = Group.objects.get(name='Annotator')
        queryset = User.objects.filter(groups=group)
        return queryset


class SentencesByProjectView(viewsets.ModelViewSet):
    serializer_class = SentenceSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        print(self.kwargs)
        project = Project.objects.get(project_id=self.kwargs['project_id'])
        print(self.request.user.username, project.created_by == self.request.user.username, self.request.user.username in project.assigned_to)
        if project.created_by == self.request.user.username or self.request.user.username in project.assigned_to:
            return Sentence.objects.filter(project_id=project.pk)
        return Response('You are not authorized to view sentences for this project', status=status.HTTP_400_BAD_REQUEST)
