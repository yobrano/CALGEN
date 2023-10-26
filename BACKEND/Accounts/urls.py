from django.urls import path
from Accounts.AccountsApi.urls import generics_urls

app_name = "Accounts"
urlpatterns = []
urlpatterns += generics_urls