from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from Calgen.admin import calgen_admin_site

urlpatterns = [
    path("admin/", admin.site.urls),
    path("calgen/", include("Calgen.urls")),
    path("accounts/", include("Accounts.urls")),
    path("calgen-admin/", calgen_admin_site.urls ),
]


urlpatterns += static(settings.STATIC_URL, document_root= settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)
