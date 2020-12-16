from django.shortcuts import render, HttpResponse


def home(request):
    return render(request, "greetingApp/home.html")