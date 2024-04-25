from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.forms.models import model_to_dict
from django.core.exceptions import ObjectDoesNotExist
import json
from .models import Technician, Appointment


@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = [model_to_dict(technician) for technician in Technician.objects.all()]
        return JsonResponse({"technicians": technicians}, safe=False)
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(model_to_dict(technician), safe=False)
        except ValueError:
            return JsonResponse({"message": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)


@require_http_methods(["GET", "DELETE"])
def api_technician(request, id):
    try:
        technician = Technician.objects.get(id=id)
    except Technician.DoesNotExist:
        return JsonResponse({"message": "Technician does not exist"}, status=400)

    if request.method == "GET":
        return JsonResponse(model_to_dict(technician), safe=False)
    else:
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


from django.core.exceptions import ObjectDoesNotExist

@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        appointments = [model_to_dict(appointment) for appointment in Appointment.objects.all()]
        for appointment in appointments:
            try:
                technician = Technician.objects.get(employee_id=appointment['technician'])
                appointment['technician'] = model_to_dict(technician)
            except ObjectDoesNotExist:
                appointment['technician'] = None
        return JsonResponse({"appointments": appointments}, safe=False)
    else:
        content = json.loads(request.body)
        try:
            employee_id = content.pop("technician_id")  # Use pop to remove the technician key from the content
            technician = Technician.objects.get(employee_id=employee_id)
            content["technician"] = technician  # Assign the technician instance to the technician field
            date_time = content.get("date_time")
            vin = content.get("vin")
            customer = content.get("customer")
            reason = content.get("reason")
        except ObjectDoesNotExist:
            return JsonResponse({"message": "Technician does not exist"}, status=400)

        try:
            appointment = Appointment.objects.create(**content)
            return JsonResponse({"appointment": model_to_dict(appointment)}, safe=False)
        except Exception as e:
            return JsonResponse({"message": "Error creating appointment: " + str(e)}, status=400)

@require_http_methods(["GET", "DELETE"])
def api_appointment(request, id):
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
        if appointment.status == 'cancelled':
            return JsonResponse({"message": "Appointment is already cancelled"}, status=400)
        appointment.status = "cancelled"
        appointment.save()
        return JsonResponse({"appointment": model_to_dict(appointment)}, safe=False)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment does not exist"}, status=400)


@require_http_methods(["PUT"])
def api_update_appt_status_finish(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        if appointment.status == 'completed':
            return JsonResponse({"message": "Appointment is already completed"}, status=400)
        appointment.status = "completed"
        appointment.save()
        return JsonResponse({"appointment": model_to_dict(appointment)}, safe=False)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment does not exist"}, status=400)


@require_http_methods(["GET"])
def api_appointment_history(request, vin):
    appointments = list(Appointment.objects.filter(vin=vin).values())
    return JsonResponse({"appointments": appointments}, safe=False)