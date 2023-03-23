from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import MyTokenObtainPairView, CreateProjectView, ListProjectView, ListUserView, SentencesByProjectView, UpdateSentenceView

urlpatterns = [
    path('auth/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/list/',
         ListUserView.as_view({'get': 'list'}), name='list_users'),
    path('projects/create/', CreateProjectView.as_view(), name='create_project'),
    path('projects/list/', ListProjectView.as_view(), name='list_projects'),
    path('projects/<str:project_id>/sentences/',
         SentencesByProjectView.as_view({'get': 'list'}), name='sentences-by-project'),
    path('projects/<str:project_id>/sentences/update/',
         UpdateSentenceView.as_view(), name='update-sentences'),
]
