from django.urls import path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('api/list_work_shifts/', views.list_work_shifts, name='list_work_shifts'),
    path('api/start_work_shift/', views.start_work_shift, name='start_work_shift'),
    path('api/end_work_shift/<int:shift_id>/', views.end_work_shift, name='end_work_shift'),
    path('api/add_work_details/<int:shift_id>/', views.add_work_details, name='add_work_details'),
    path('api/claim_comp_time/<int:shift_id>/', views.claim_comp_time, name='claim_comp_time'),
    path('', TemplateView.as_view(template_name="index.html"), name='index'),
]
