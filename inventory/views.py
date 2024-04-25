from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.forms.models import model_to_dict
import json
from .models import Automobile, Manufacturer, VehicleModel

@require_http_methods(["GET", "POST"])
def api_automobiles(request):
    if request.method == "GET":
        autos = [model_to_dict(auto) for auto in Automobile.objects.all()]
        for auto in autos:
            model = VehicleModel.objects.get(id=auto['model'])
            manufacturer = Manufacturer.objects.get(id=model.manufacturer_id)
            auto['model_name'] = model.name
            auto['manufacturer_name'] = manufacturer.name
        return JsonResponse({"autos": autos})
    else:
        try:
            content = json.loads(request.body)
            model_id = content["model_id"]
            model = VehicleModel.objects.get(pk=model_id)
            manufacturer = model.manufacturer
            content["model"] = model
            auto = Automobile.objects.create(**content)
            auto_data = model_to_dict(auto)
            auto_data["model_name"] = model.name
            auto_data["manufacturer_name"] = manufacturer.name
            return JsonResponse(auto_data, safe=False)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)


@require_http_methods(["DELETE", "GET", "PUT"])
def api_automobile(request, vin):
    try:
        auto = Automobile.objects.get(vin=vin)
        if request.method == "GET":
            return JsonResponse(model_to_dict(auto), safe=False)
        elif request.method == "DELETE":
            auto.delete()
            return JsonResponse(model_to_dict(auto), safe=False)
        else: # PUT
            content = json.loads(request.body)
            for prop in ["color", "year", "sold"]:
                if prop in content:
                    setattr(auto, prop, content[prop])
            auto.save()
            return JsonResponse(model_to_dict(auto), safe=False)
    except Automobile.DoesNotExist:
        return JsonResponse({"message": "Does not exist"}, status=404)


@require_http_methods(["GET", "POST"])
def api_manufacturers(request):
    if request.method == "GET":
        manufacturers = [model_to_dict(manufacturer) for manufacturer in Manufacturer.objects.all()]
        return JsonResponse({"manufacturers": manufacturers})
    else:
        try:
            content = json.loads(request.body)
            manufacturer = Manufacturer.objects.create(**content)
            return JsonResponse(model_to_dict(manufacturer), safe=False)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)


@require_http_methods(["DELETE", "GET", "PUT"])
def api_manufacturer(request, pk):
    try:
        manufacturer = Manufacturer.objects.get(id=pk)
        if request.method == "GET":
            return JsonResponse(model_to_dict(manufacturer), safe=False)
        elif request.method == "DELETE":
            manufacturer.delete()
            return JsonResponse(model_to_dict(manufacturer), safe=False)
        else: # PUT
            content = json.loads(request.body)
            for prop in ["name"]:
                if prop in content:
                    setattr(manufacturer, prop, content[prop])
            manufacturer.save()
            return JsonResponse(model_to_dict(manufacturer), safe=False)
    except Manufacturer.DoesNotExist:
        return JsonResponse({"message": "Does not exist"}, status=404)


@require_http_methods(["GET", "POST"])
def api_vehicle_models(request):
    if request.method == "GET":
        models = [model_to_dict(model) for model in VehicleModel.objects.all()]
        for model in models:
            manufacturer = Manufacturer.objects.get(id=model['manufacturer'])
            model['manufacturer_name'] = manufacturer.name
        return JsonResponse({"models": models})
    else:
        try:
            content = json.loads(request.body)
            manufacturer_id = content["manufacturer_id"]
            manufacturer = Manufacturer.objects.get(id=manufacturer_id)
            content["manufacturer"] = manufacturer
            model = VehicleModel.objects.create(**content)
            return JsonResponse(model_to_dict(model), safe=False)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)


@require_http_methods(["DELETE", "GET", "PUT"])
def api_vehicle_model(request, pk):
    try:
        model = VehicleModel.objects.get(id=pk)
        if request.method == "GET":
            return JsonResponse(model_to_dict(model), safe=False)
        elif request.method == "DELETE":
            model.delete()
            return JsonResponse(model_to_dict(model), safe=False)
        else: # PUT
            content = json.loads(request.body)
            for prop in ["name", "picture_url"]:
                if prop in content:
                    setattr(model, prop, content[prop])
            model.save()
            return JsonResponse(model_to_dict(model), safe=False)
    except VehicleModel.DoesNotExist:
        return JsonResponse({"message": "Does not exist"}, status=404)