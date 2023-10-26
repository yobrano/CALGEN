from django.contrib import admin
from Calgen import models


# Register your models here.
class CalgenAdminSite(admin.AdminSite):
    site_title = "Calgen Admin"
    site_header = "Calgen Admin"

calgen_admin_site = CalgenAdminSite(name= "CalgenAdmin")

admin_model_pairs = [
    (models.FileManager, models.FileManagerAdmin)
]

for model, admin_model in admin_model_pairs:
    calgen_admin_site.register(model, admin_model)
    admin.site.register(model, admin_model)


admin.site.register([models.FileCategory])
calgen_admin_site.register([models.FileCategory])