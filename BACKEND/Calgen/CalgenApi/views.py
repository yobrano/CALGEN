import csv 

from django.urls import path
from django.shortcuts import get_object_or_404
from django.conf import settings

from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response as RestResponse
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED

from Calgen import models
from Calgen.CalgenApi import serializers

generics_urls = []

class FileManagerListCreate(generics.ListCreateAPIView):
    queryset = models.FileManager.objects.all()
    serializer_class = serializers.FileManagerSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data = request.data)
        if(serializer.is_valid()):
            serializer.save(user= request.user)
            return RestResponse(serializer.data, status = HTTP_200_OK)

        return RestResponse(serializer.errors, status= HTTP_400_BAD_REQUEST)
    


class FileManagerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.FileManager.objects.all()
    serializer_class = serializers.FileManagerSerializer
    lookup_field = "code"
    lookup_url_kwarg = "file_code"
    permission_classes = [IsAuthenticated]

    def get(self,  request, file_code):
        file = get_object_or_404(self.queryset, code = file_code)
        print(request.user)
        serializer = serializers.FileManagerSerializer(file)
        file_path = str(settings.BASE_DIR) + "/media/" + str(file.upload)
        with open(file_path, "r") as csv_file:
            list(csv.DictReader(csv_file))
        return RestResponse(serializer.data, status= HTTP_200_OK)

        



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


generics_urls= [
    path("file/", FileManagerListCreate.as_view(), name="FileManagerListCreate"),
    path("file/<file_code>/", FileManagerDetail.as_view(), name= "FileManagerDetail"),
    path("file-category/", FileCategoryListCreate.as_view(), name="FileCategoryListCreate"),
    path("file-category/<category_id>/", FileCategoryDetail.as_view(), name= "FileCategoryDetail"),
]