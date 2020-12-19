from djongo import models


class GreetingRecords(models.Model):
    name = models.CharField(max_length=100)
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return f"{self.name}, {self.message[:20]}..." if len(self.message) > 10 else f"{self.name}, {self.message}"
    