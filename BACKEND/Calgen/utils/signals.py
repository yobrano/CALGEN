from django.dispatch import receiver
from django.db.models.signals import pre_save
from Calgen.models import FileManager
from secrets import token_hex


# @receiver(pre_save, sender = FileManager )
# def rename_file(sender, instance, *args, **kwargs):
#     instance.code = token_hex(10)
#     instance.name = instance.upload.name
    
