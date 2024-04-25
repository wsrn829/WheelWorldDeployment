from django.db import models
from django.urls import reverse


class Technician(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    employee_id = models.PositiveIntegerField(unique=True, primary_key=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} [Employee ID: {self.employee_id}]"

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"pk": self.pk})


class Appointment(models.Model):
    STATUS_CHOICES = [
        ('created', 'Created'),
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='created')
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=150)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
        to_field='employee_id'
    )

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.pk})

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)