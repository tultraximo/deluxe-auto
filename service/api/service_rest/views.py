from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Technician, Appointment, AutomobileVO
from common.json import ModelEncoder

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        # "employee_number",
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
    ]

    def get_extra_data(self, o):
        return {"id": o.id}


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "customer_name",
        "time",
        "reason",
        "service_vin",
        "vip",
        "technician",
        "completed",
        "canceled",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

    def get_extra_data(self, o):
        return {
            "id": o.id,
        }


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder = TechnicianEncoder
        )

    else:
        content = json.loads(request.body)
        technicians = Technician.objects.create(**content)
        return JsonResponse(
            technicians,
            encoder=TechnicianEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments":appointments},
            encoder=AppointmentEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            # print(content)
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
            try:
                automobile = AutomobileVO.objects.get(vin=content["service_vin"])
                content["vip"] = True
            except:
                content["vip"] = False
            content["completed"] = False
            content["canceled"] = False
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the appointment"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST"])
def api_list_AutomobileVO(request):
    if request.method == "GET":
        VO = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobile":VO},
            encoder=AutomobileVOEncoder,
        )
