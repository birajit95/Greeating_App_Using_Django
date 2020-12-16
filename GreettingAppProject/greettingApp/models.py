from djongo import models


class GreetingRecords(models.Model):
    name = models.CharField(max_length=100)
    message = models.TextField()

    def __str__(self):
        return f"{self.name}, {self.message[:20]}..."