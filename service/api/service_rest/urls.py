from django.urls import path

from .views import (
    api_list_appointments,
    api_list_technicians,
    api_list_AutomobileVO,
    api_update_appointment_vip
)

urlpatterns = [
    path(
        "appointments/",
        api_list_appointments,
        name="api_list_appointments",
    ),
    path(
        "technicians/",
        api_list_technicians,
        name="api_list_technicians",
    ),
    path(
        "vo/",
        api_list_AutomobileVO,
        name="api_list_AutomobileVO",
    ),
    path(
        "appointments/<int:appointment_id>/update-vip/",
        api_update_appointment_vip,
        name="update_appointment_vip",
    )
]
