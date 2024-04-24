from django.db import models
from django.urls import reverse
from inventory.models import Automobile

class Salesperson(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    employee_id = models.CharField(max_length=150, unique=True)

    def get_api_url(self):
        return reverse("api_list_sales_person", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.employee_id}"


class Customer(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    address = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.first_name} {self.last_name}  {self.address} {self.phone_number}"


class Sale(models.Model):
    price = models.PositiveBigIntegerField()
    automobile = models.ForeignKey(Automobile, related_name="sales", on_delete=models.CASCADE)
    salesperson = models.ForeignKey(Salesperson, related_name="sales", on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, related_name="sales", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.price} {self.automobile} {self.salesperson}  {self.customer}"