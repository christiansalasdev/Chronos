from django.utils import timezone
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import WorkShift, WorkDetail, CompTime
from .serializers import WorkShiftSerializer, WorkDetailSerializer, CompTimeSerializer
from dateutil.parser import parse

@api_view(['GET'])
def list_work_shifts(request):
    shifts = WorkShift.objects.all()
    serializer = WorkShiftSerializer(shifts, many=True)
    return JsonResponse(serializer.data, safe=False)

# Add more API views for other functionalities here
@api_view(['POST'])
def start_work_shift(request):
    shift = WorkShift(start_time=timezone.now())
    shift.save()
    serializer = WorkShiftSerializer(shift)
    return JsonResponse(serializer.data)

@api_view(['POST'])
def end_work_shift(request, shift_id):
    try:
        shift = WorkShift.objects.get(id=shift_id)
    except WorkShift.DoesNotExist:
        return HttpResponse(status=404)
    
    shift.end_time = timezone.now()
    shift.duration = shift.end_time - shift.start_time
    shift.expiration_date = timezone.now() + timezone.timedelta(days=90)
    shift.save()
    serializer = WorkShiftSerializer(shift)
    return JsonResponse(serializer.data)

@api_view(['POST'])
def add_work_details(request, shift_id):
    try:
        shift = WorkShift.objects.get(id=shift_id)
    except WorkShift.DoesNotExist:
        return HttpResponse(status=404)
    
    detail = WorkDetail(work_shift=shift, description=request.data.get('description'), work_order=request.data.get('work_order'))
    detail.save()
    serializer = WorkDetailSerializer(detail)
    return JsonResponse(serializer.data)

@api_view(['POST'])
def claim_comp_time(request, shift_id):
    try:
        shift = WorkShift.objects.get(id=shift_id)
    except WorkShift.DoesNotExist:
        return HttpResponse(status=404)

    if shift.is_claimed:
        return JsonResponse({"message": "Comp time already claimed for this shift."})

    shift.is_claimed = True
    shift.save()
    comp_time = CompTime(work_shift=shift, claimed_time=timezone.now())
    comp_time.save()
    serializer = CompTimeSerializer(comp_time)
    return JsonResponse(serializer.data)

@api_view(['POST'])
def start_work_shift(request):
    try:
        start_time = request.data.get('start_time', timezone.now())
        
        # Convert to datetime object if it's a string
        if isinstance(start_time, str):
            start_time = parse(start_time)
            
        end_time = request.data.get('end_time', start_time)
        
        # Convert to datetime object if it's a string
        if isinstance(end_time, str):
            end_time = parse(end_time)
        
        # Calculate duration
        duration = end_time - start_time
        
        expiration_date = start_time + timezone.timedelta(days=90)
        
        shift = WorkShift(start_time=start_time, end_time=end_time, duration=duration, expiration_date=expiration_date)
        shift.save()
        
        serializer = WorkShiftSerializer(shift)
        return Response(serializer.data)  # Ensure a Response object is returned

    except Exception as e:
        return Response({'error': str(e)}, status=400)  # Return an error response if something goes wrong
