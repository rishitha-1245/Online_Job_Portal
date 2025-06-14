# jobs/views.py
from rest_framework import viewsets
from .models import Job, Application
from .serializers import JobSerializer, ApplicationSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('-date_posted')
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
