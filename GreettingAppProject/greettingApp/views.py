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
            data = [dict(item) for item in GreetingRecords.objects.all().values('id', 'name', 'message')]
            return HttpResponse(json.dumps(data))
        else:
            return HttpResponse("false")


def deleteRecord(request, recordID):
    if request.method == "DELETE":
        GreetingRecords.objects.filter(id=recordID).delete()
        data = [dict(item) for item in GreetingRecords.objects.all().values('id', 'name', 'message')]
        return HttpResponse(json.dumps(data))
    return HttpResponse("false")


def updateRecord(request, recordID):
    if request.method == "PUT":
        formData = json.loads(request.body.decode())
        if formData:
            record = GreetingRecords.objects.get(id=recordID)
            record.name = formData["name"]
            record.message = formData["message"]
            record.save()
            data = [dict(item) for item in GreetingRecords.objects.all().values('id', 'name', 'message')]
            return HttpResponse(json.dumps(data))
        else:
            return HttpResponse("false")
