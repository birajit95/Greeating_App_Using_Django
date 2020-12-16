from django.urls import path
from .views import home, addData

urlpatterns = [

    path('', home, name="home"),
    path('addData/', addData, name="addData")
            ]
