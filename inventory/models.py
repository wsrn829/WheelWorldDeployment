from django.db import models
from django.urls import reverse


class Manufacturer(models.Model):
    name = models.CharField(max_length=100, unique=True, help_text="Manufacturer's name")

    class Meta:
        verbose_name_plural = "Manufacturers"

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_manufacturer", kwargs={"pk": self.id})


class VehicleModel(models.Model):
    name = models.CharField(max_length=100, help_text="Model's name")
    picture_url = models.URLField(help_text="URL of the model's picture")

    manufacturer = models.ForeignKey(
        Manufacturer,
        related_name="models",
        on_delete=models.CASCADE,
        help_text="Manufacturer of the model",
    )

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_vehicle_model", kwargs={"pk": self.id})


class Automobile(models.Model):
    color = models.CharField(max_length=50, help_text="Color of the automobile")
    year = models.PositiveSmallIntegerField(help_text="Manufacturing year of the automobile")
    vin = models.CharField(max_length=17, unique=True, help_text="Vehicle Identification Number")
    sold = models.BooleanField(default=False, help_text="Is the automobile sold?")

    model = models.ForeignKey(
        VehicleModel,
        related_name="automobiles",
        on_delete=models.CASCADE,
        help_text="Model of the automobile",
    )

    def __str__(self):
        return self.vin

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})