import pandas as pd

from django.urls import path
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.http import FileResponse

from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes as permission

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response as RestResponse
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR

from Calgen import models
from Calgen.CalgenApi import serializers
from Calgen.engine.Setup import Generate

generics_urls = []


# ------------  GENERIC VIEWS -----------------
class FileManagerListCreate(generics.ListCreateAPIView):
    queryset = models.FileManager.objects.all()
    serializer_class = serializers.FileManagerSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if (serializer.is_valid()):
            serializer.save(user=request.user)
            return RestResponse(serializer.data, status=HTTP_200_OK)

        return RestResponse(serializer.errors, status=HTTP_400_BAD_REQUEST)


class FileManagerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.FileManager.objects.all()
    serializer_class = serializers.FileManagerSerializer
    lookup_field = "code"
    lookup_url_kwarg = "file_code"
    permission_classes = [IsAuthenticated]

    def get(self, request, file_code):
        file = get_object_or_404(self.queryset, code=file_code)
        serializer = serializers.FileContentSerializer(file)
        return RestResponse(serializer.data, status=HTTP_200_OK)
    
    def put(self, request, file_code):
        query = get_object_or_404(models.FileManager, code=file_code)
        table = request.data.get("table")
        df = pd.DataFrame(table)
        file_path = f"{str(settings.MEDIA_ROOT)}\\calgen\\{query.user.username}\\{query.code}"
        df.to_csv( file_path, index= False)

        return RestResponse( {"message": "Updated successfully"}, status= HTTP_200_OK)

class FileCategoryListCreate(generics.ListCreateAPIView):
    queryset = models.FileCategory.objects.all()
    serializer_class = serializers.FileCategorySerializer
    permission_classes = [IsAuthenticated]


class FileCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.FileCategory.objects.all()
    serializer_class = serializers.FileCategorySerializer
    lookup_field = "id"
    lookup_url_kwarg = "category_id"
    permission_classes = [IsAuthenticated]


# ------------ FUNCTION VIEWS -----------------

@api_view(["POST"])
@permission([IsAuthenticated])
def build(request, file_code):
    query = get_object_or_404(models.FileManager, code=file_code)

    config = request.data.copy()
    config["tableFilePath"] = f"{str(settings.MEDIA_ROOT)}\\calgen\\{query.user.username}\\{query.code}"
    config["outputDir"] =  f"{str(settings.MEDIA_ROOT)}\\calgen\\{query.user.username}\\builds\\{query.code}"
    config["zipResponse"] = True
    output_file =  Generate(config)["zipFile"] 
    return FileResponse( open(output_file, "rb"), filename=f"{config['tableName']}.zip")
    



generics_urls = [
    path("file/", FileManagerListCreate.as_view(), name="FileManagerListCreate"),
    path("file/<file_code>/", FileManagerDetail.as_view(),
         name="FileManagerDetail"),
    path("build/<file_code>/", build, name="build"),
    path("file-category/", FileCategoryListCreate.as_view(),
         name="FileCategoryListCreate"),
    path("file-category/<category_id>/",
         FileCategoryDetail.as_view(), name="FileCategoryDetail"),
]
