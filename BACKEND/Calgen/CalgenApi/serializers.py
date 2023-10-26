from rest_framework import serializers 
from Calgen import models


class FileCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FileCategory
        fields ="__all__"


class FileManagerSerializer(serializers.ModelSerializer):
    category = FileCategorySerializer(read_only= True)

    class Meta:
        model = models.FileManager
        fields = "__all__"

    
