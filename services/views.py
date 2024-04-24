from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from .models import Technician, Appointment


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = list(Technician.objects.values())
        return JsonResponse({"technicians": technicians}, safe=False)
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse({"technician": model_to_dict(technician)}, safe=False)


@require_http_methods(["GET", "DELETE"])
def api_technician_details(request, id):
    try:
        technician = Technician.objects.get(id=id)
    except Technician.DoesNotExist:
        return JsonResponse({"message": "Technician does not exist"}, status=400)

    if request.method == "GET":
        return JsonResponse({"technician": model_to_dict(technician)}, safe=False)
    else:
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = list(Appointment.objects.values())
        return JsonResponse({"appointments": appointments}, safe=False)
    else:
        content = json.loads(request.body)
        try:
            employee_id = content["technician"]
            technician = Technician.objects.get(employee_id=employee_id)
            content["technician"] = technician.id
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Invalid Appointment"}, status=400)

        appointment = Appointment.objects.create(**content)
        return JsonResponse({"appointment": model_to_dict(appointment)}, safe=False)


@require_http_methods(["GET", "DELETE"])
def api_appointment_details(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment does not exist"}, status=400)

    if request.method == "GET":
        return JsonResponse({"appointment": model_to_dict(appointment)}, safe=False)
    else:
        count, _ = Appointment.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["PUT"])
def api_update_appt_status_cancel(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment does not exist"}, status=400)

    appointment.status = "cancelled"
    appointment.save()

    return JsonResponse({"appointment": model_to_dict(appointment)}, safe=False)


@require_http_methods(["PUT"])
def api_update_appt_status_finish(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment does not exist"}, status=400)

    appointment.status = "completed"
    appointment.save()

    return JsonResponse({"appointment": model_to_dict(appointment)}, safe=False)


@require_http_methods(["GET"])
def api_appointment_history(request, vin):
    appointments = list(Appointment.objects.filter(vin=vin).values())
    return JsonResponse({"appointments": appointments}, safe=False)