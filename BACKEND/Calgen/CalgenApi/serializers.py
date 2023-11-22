from django.conf import settings

from rest_framework import serializers
from Calgen import models
import pandas as pd
import json

from Calgen.engine.config import importantColumns



class FileCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FileCategory
        fields = "__all__"


class FileManagerSerializer(serializers.ModelSerializer):
    category = FileCategorySerializer(read_only=True)

    class Meta:
        read_only_fields = ("created_at", "updated_at", "code", "user", "name")
        model = models.FileManager
        fields = "__all__"


class FileContentSerializer(serializers.ModelSerializer):
    file_contents = serializers.SerializerMethodField()

    def get_file_contents(self, instance) -> list:
        file_path = str(settings.MEDIA_ROOT) + "/calgen/" + \
            instance.user.username + "/" + instance.code

        try:
            df = pd.read_csv(file_path)
            for column in importantColumns:
                if column not in df.columns:
                    df[column] = None
                    if column == "Retained Field":
                        df["Retained Field"] = "y"
                    
            df = df.rename(columns={"Field No.": "id"})
            
            df_json = df.to_json(index=False, orient="records")
            ty = type(df_json)
            print(ty)
            return json.loads(df_json)
        except:
            return [file_path]

    class Meta:
        read_only_fields = ("file_contents", "code", "name")
        model = models.FileManager
        fields = ["file_contents", "code", "name"]
