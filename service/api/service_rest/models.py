from django.db import models



class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name



class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin



class Appointment(models.Model):
    customer_name = models.CharField(max_length=150)
    time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    service_vin = models.CharField(max_length=17)
    vip = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)
    canceled = models.BooleanField(default=False)

    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    def cancel(self):
        self.canceled = True
        self.save()

    def complete(self):
        self.completed = True
        self.save()
