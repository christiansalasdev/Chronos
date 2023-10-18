from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import WorkShift, WorkDetail, CompTime
from .serializers import WorkShiftSerializer, WorkDetailSerializer, CompTimeSerializer

@api_view(['GET'])
def list_work_shifts(request):
    shifts = WorkShift.objects.all()
    serializer = WorkShiftSerializer(shifts, many=True)
    return JsonResponse(serializer.data, safe=False)

# Add more API views for other functionalities here
