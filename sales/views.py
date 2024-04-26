from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.forms.models import model_to_dict
import json
from .models import Salesperson, Customer, Sale
from inventory.models import Automobile

@require_http_methods(['GET', 'POST'])
def api_list_salesperson(request):
    if request.method == "GET":
        salespersons = Salesperson.objects.all()
        salespersons_list = list(salespersons.values())
        return JsonResponse(salespersons_list, safe=False)
    else:
        content = json.loads(request.body)
        if Salesperson.objects.filter(employee_id=content.get('employee_id')).exists():
            return JsonResponse({"error": "A salesperson with this employee_id already exists."}, status=400)
        salesperson = Salesperson.objects.create(**content)
        salesperson_dict = model_to_dict(salesperson)
        return JsonResponse(salesperson_dict, safe=False)

@require_http_methods(['GET', 'DELETE'])
def api_show_salesperson(request, id):
    if  request.method == "GET":
        salesperson = Salesperson.objects.get(id=id)
        return JsonResponse(model_to_dict(salesperson), safe=False)
    else:
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(['GET', 'POST'])
def api_list_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        customers_list = list(customers.values())
        return JsonResponse(customers_list, safe=False)
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(model_to_dict(customer), safe=False)

@require_http_methods(['GET', 'DELETE'])
def api_show_customer(request, id):
    if  request.method == "GET":
        customer = Customer.objects.get(id=id)
        return JsonResponse(model_to_dict(customer), safe=False)
    else:
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(['GET', 'POST'])
def api_list_sale(request):
    if request.method == "GET":
        sales = Sale.objects.all().values('id', 'price', 'automobile__vin', 'salesperson__first_name', 'customer__first_name')
        sales_list = list(sales)
        return JsonResponse(sales_list, safe=False)
    else:
        content = json.loads(request.body)
        try:
            automobile_id = content["automobile"]
            automobile = Automobile.objects.get(vin=automobile_id)
            content["automobile"] = automobile
        except Automobile.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile_id"},
                status = 400,
            )

        try:
            salesperson_id = content["salesperson"]
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content['salesperson'] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson_id"},
                status = 400,
            )

        try:
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer_id"},
                status = 400,
            )

        sale = Sale.objects.create(**content)
        automobile.sold = True
        automobile.save()
        return JsonResponse(model_to_dict(sale), safe=False)

@require_http_methods(['GET', 'DELETE'])
def api_show_sale(request, id):
    if  request.method == "GET":
        sale = Sale.objects.get(id=id)
        return JsonResponse(model_to_dict(sale), safe=False)
    else:
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})