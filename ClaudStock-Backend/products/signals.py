import os

from django.db.models.signals import pre_delete, pre_save
from django.dispatch import receiver
from products.models import Product


def delete_image(instance):
    try:
        os.remove(instance.photo.path)
    except (ValueError, FileNotFoundError):
        pass

@receiver(pre_delete, sender=Product)
def delete_product_image(sender, instance, *args, **kwargs):
    if instance.photo:
        delete_image(instance)

@receiver(pre_save, sender=Product)
def update_product_image(sender, instance, *args, **kwargs):
    old_instance = Product.objects.filter(pk=instance.pk).first()
    if not old_instance:
        return
    
    if old_instance.photo != instance.photo:
        delete_image(old_instance)
