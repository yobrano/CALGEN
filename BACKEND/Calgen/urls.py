from django.urls import path, include
from Calgen import views
from Calgen.CalgenApi.views import generics_urls


app_name = "Calgen"
urlpatterns = [
    path("", views.index, name= "index")
]

urlpatterns += generics_urls