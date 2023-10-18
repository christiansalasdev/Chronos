from django.contrib import admin
from .models import WorkShift, WorkDetail, CompTime

@admin.register(WorkShift)
class WorkShiftAdmin(admin.ModelAdmin):
    list_display = ['start_time', 'end_time', 'duration', 'is_claimed', 'expiration_date']

@admin.register(WorkDetail)
class WorkDetailAdmin(admin.ModelAdmin):
    list_display = ['work_shift', 'description', 'work_order']

@admin.register(CompTime)
class CompTimeAdmin(admin.ModelAdmin):
    list_display = ['work_shift', 'claimed_time']