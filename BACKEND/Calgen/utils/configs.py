from django.core.files.storage import FileSystemStorage

class OverwriteStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        if self.exists(name):
            self.delete(name)
        return name

overwrite_storage = OverwriteStorage()


def upload_config(instance, file_name):
    return f"calgen/{instance.user.username}/{file_name}"

