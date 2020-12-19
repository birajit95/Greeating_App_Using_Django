from django.shortcuts import render, HttpResponse
from .models import GreetingRecords
from .logger.logger import logger
import json


def home(request):
    recordData = GreetingRecords.objects.all()
    logger.info("All records are displayed")
    return render(request, "greetingApp/home.html", {"data": recordData})


def addData(request):
    if request.method == 'POST':
        formData = json.loads(request.body.decode())
        if formData:
            recordData = GreetingRecords(name=formData["name"], message=formData['message'])
            recordData.save()
            logger.info(f"{recordData} Data is saved")
            data = [dict(item) for item in GreetingRecords.objects.all().values('id', 'name', 'message')]
            return HttpResponse(json.dumps(data))
        else:
            logger.error("Data saving failed")
            return HttpResponse("false")


def deleteRecord(request, recordID):
    if request.method == "DELETE":
        record = GreetingRecords.objects.filter(id=recordID)
        record.delete()
        logger.info(f"{record} Record Deleted successfully")
        data = [dict(item) for item in GreetingRecords.objects.all().values('id', 'name', 'message')]
        return HttpResponse(json.dumps(data))
    logger.error("Record Deletion failed")
    return HttpResponse("false")


def updateRecord(request, recordID):
    if request.method == "PUT":
        formData = json.loads(request.body.decode())
        if formData:
            record = GreetingRecords.objects.get(id=recordID)
            record.name = formData["name"]
            record.message = formData["message"]
            record.save()
            logger.info(f"{record} Record updated successfully")
            data = [dict(item) for item in GreetingRecords.objects.all().values('id', 'name', 'message')]
            return HttpResponse(json.dumps(data))
        else:
            logger.error("Record Updating failed")
            return HttpResponse("false")
