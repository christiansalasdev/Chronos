from django.urls import path
from . import views

urlpatterns = [
    path('api/list_work_shifts/', views.list_work_shifts, name='list_work_shifts'),
    # Add more URL patterns for other API endpoints here
]
