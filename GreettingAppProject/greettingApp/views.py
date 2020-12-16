from django.shortcuts import render, HttpResponse
from .models import GreetingRecords
import json


def home(request):
    recordData = [dict(item) for item in GreetingRecords.objects.all().values('id', 'name', 'message')]

    return render(request, "greetingApp/home.html", {"data": json.dumps(recordData)})


def addData(request):
    if request.method == 'POST':
        formData = json.loads(request.body.decode())
        if formData:
            recordData = GreetingRecords(name=formData["name"], message=formData['message'])
            recordData.save()
            return HttpResponse("true")
        else:
            return HttpResponse("false")
