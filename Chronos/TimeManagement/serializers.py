from rest_framework import serializers
from .models import WorkShift, WorkDetail, CompTime

class WorkShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkShift
        fields = '__all__'

class WorkDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkDetail
        fields = '__all__'

class CompTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompTime
        fields = '__all__'
