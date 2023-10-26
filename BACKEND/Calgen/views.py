from django.shortcuts import render
from rest_framework.response import Response as RestResponse
from rest_framework.decorators import api_view

from Calgen.CalgenApi.views import FileCategoryDetail, FileCategoryListCreate, FileManagerDetail, FileManagerListCreate
# Create your views here.

@api_view(["GET"])
def index(request):
    return RestResponse(data={"message": "Take me to your leader :|"})




