from django.urls import path

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from Calgen import models
from Calgen.CalgenApi import serializers

generics_urls = []

class FileManagerListCreate(generics.ListCreateAPIView):
    queryset = models.FileManager.objects.all()
    serializer_class = serializers.FileManagerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FileManagerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.FileManager.objects.all()
    serializer_class = serializers.FileManagerSerializer
    lookup_field = "code"
    lookup_url_kwarg = "file_code"
    permission_classes = [IsAuthenticated]



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