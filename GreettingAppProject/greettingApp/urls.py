from django.urls import path
from .views import home, addData, deleteRecord, updateRecord

urlpatterns = [

    path('', home, name="home"),
    path('addData/', addData, name="addData"),
    path('delete/<int:recordID>', deleteRecord, name='deleteRecord'),
    path('update/<int:recordID>', updateRecord, name='updateRecord'),
]
