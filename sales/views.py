from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
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
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(salesperson.__dict__, safe=False)

@require_http_methods(['GET', 'DELETE'])
def api_show_salesperson(request, id):
    if  request.method == "GET":
        salesperson = Salesperson.objects.get(id=id)
        return JsonResponse(salesperson.__dict__, safe=False)
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
        return JsonResponse(customer.__dict__, safe=False)

@require_http_methods(['GET', 'DELETE'])
def api_show_customer(request, id):
    if  request.method == "GET":
        customer = Customer.objects.get(id=id)
        return JsonResponse(customer.__dict__, safe=False)
    else:
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(['GET', 'POST'])
def api_list_sale(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        sales_list = list(sales.values())
        return JsonResponse(sales_list, safe=False)
    else:
        content = json.loads(request.body)
        try:
            automobile_id = content["automobile"]
            automobile = Automobile.objects.get(id=automobile_id)
            content["automobile"] = automobile.id
        except Automobile.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile_id"},
                status = 400,
            )

        try:
            salesperson_id = content["salesperson"]
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content['salesperson'] = salesperson.id
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson_id"},
                status = 400,
            )

        try:
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer.id
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer_id"},
                status = 400,
            )

        sale = Sale.objects.create(**content)
        return JsonResponse(sale.__dict__, safe=False)

@require_http_methods(['GET', 'DELETE'])
def api_show_sale(request, id):
    if  request.method == "GET":
        sale = Sale.objects.get(id=id)
        return JsonResponse(sale.__dict__, safe=False)
    else:
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})