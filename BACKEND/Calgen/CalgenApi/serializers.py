from django.conf import settings

from rest_framework import serializers 
from Calgen import models
import csv


class FileCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FileCategory
        fields ="__all__"

class FileManagerSerializer(serializers.ModelSerializer):
    category = FileCategorySerializer(read_only= True)
    file_contents = serializers.SerializerMethodField()

    def get_file_contents(self, instance) -> list:
        file_path = str(settings.BASE_DIR) + "/media/" + str(instance.upload)
        rename_col = {
            'Field No.': 'id',
        }

        try:
            with open(file_path, "r") as csv_file:
                contents = csv.DictReader(csv_file)
                temp = []
                for row in contents:
                    temp.append({rename_col.get(key, key): value for key, value in row.items()})
                return temp
        except:
            return []
        
    class Meta:
        read_only_fields  =("created_at", "updated_at", "code", "user", "name", "file_contents")
        model = models.FileManager
        fields = "__all__"

    
