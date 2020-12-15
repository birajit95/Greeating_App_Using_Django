from djongo import models


class GreetingRecords(models.Model):
    _id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    phoneNumber = models.CharField(max_length=11)
    message = models.TextField()

    def __str__(self):
        return f"{self.name}, {self.message[:20]}..."