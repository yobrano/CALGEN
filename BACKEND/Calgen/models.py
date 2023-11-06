from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User as AuthUser
from Calgen.utils import configs
from secrets import token_hex
import os

# Create your models here.
class FileCategory(models.Model):
    label = models.CharField(max_length= 250, unique= True)
    description = models.TextField()

    def __str__(self): 
        return self.label

    class Meta:
        verbose_name_plural = "categories"

class FileManager(models.Model):
    user = models.ForeignKey(AuthUser, on_delete= models.CASCADE)   
    name = models.CharField(max_length= 100)
    code = models.CharField(max_length= 10,  unique= True, editable= False )
    upload = models.FileField(upload_to= configs.upload_config, storage=configs.overwrite_storage)
    category = models.ForeignKey(FileCategory, on_delete=models.SET_NULL, null= True, blank= True)
    created_at = models.DateTimeField(auto_now_add= True)
    updated_at = models.DateTimeField(auto_now= True)


    def save(self, *args, **kwargs):
        if not self.code:
            # generate code for new file uploads
            random_token = token_hex(10)
            self.name = self.upload.name
            self.code = random_token
            self.upload.name = random_token

        else:
            # overwrite exiting uploads
            self.name = self.upload.name
            self.upload.name = self.code
        return super().save(*args, **kwargs)
            
    
    
    def __str__(self):
        return self.name
    

class FileManagerAdmin(admin.ModelAdmin):
    fieldsets = (
        ("FileDetails", {"fields": ("user", "category", "upload"),}),
    )
    list_display = ("name", "code", "created_at", "updated_at")
    list_filter = ("category", )
