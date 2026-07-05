from django.db import models
from auth_app.models import User



class Ingredients(models.Model):
    name = models.CharField(max_length=250)
    
    def __str__(self):
        return self.name


class Recipe(models.Model):
    
    class DIFFICULTY(models.TextChoices):
        EASY = 'easy', 'Easy'
        MEDIUM = 'medium', 'Medium'
        HARD = 'hard', 'Hard'
    
    title = models.CharField(max_length=60, blank=False, null=False)
    description = models.TextField()
    instructions = models.TextField()
    ingredients = models.ManyToManyField(to=Ingredients)
    cooking_time = models.CharField()
    cuisine = models.CharField()
    meal_type = models.CharField()
    images = models.ImageField(upload_to='recipes/')
    nutrition_info = models.TextField()
    difficulty = models.CharField(choices=DIFFICULTY.choices, default=DIFFICULTY.EASY)
    author = models.ForeignKey(to=User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.title
    
    
# class Categories(models.Model):
    
