from django.db import models

class WorkShift(models.Model):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    duration = models.DurationField(null=True, blank=True)
    is_claimed = models.BooleanField(default=False)
    expiration_date = models.DateTimeField(null=True, blank=True)

class WorkDetail(models.Model):
    work_shift = models.ForeignKey(WorkShift, related_name='details', on_delete=models.CASCADE)
    description = models.TextField()
    work_order = models.CharField(max_length=100)

class CompTime(models.Model):
    work_shift = models.ForeignKey(WorkShift, on_delete=models.CASCADE)
    claimed_time = models.DateTimeField()
