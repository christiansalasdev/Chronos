# Generated by Django 4.2.6 on 2023-10-18 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TimeManagement', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workshift',
            name='duration',
            field=models.DurationField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='workshift',
            name='end_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
