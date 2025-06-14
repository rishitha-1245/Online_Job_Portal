# jobportal/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from user.views import JobViewSet, ApplicationViewSet

router = routers.DefaultRouter()
router.register(r'jobs', JobViewSet)
router.register(r'applications', ApplicationViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
