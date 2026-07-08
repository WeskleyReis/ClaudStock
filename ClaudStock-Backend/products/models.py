from django.core.validators import MinValueValidator
from django.db import models
from PIL import Image


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=250)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0.01)]
    )
    quantity = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    barcode = models.CharField(
        max_length=100,
        unique=True,
        null=True,
        blank=True
    )
    photo = models.ImageField(upload_to='products/', null=True, blank=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if self.photo:
            img = Image.open(self.photo.path)
            targe_size = (240, 240)

            img_ratio = img.width / img.height
            targe_ratio = targe_size[0] / targe_size[1]

            if img_ratio > targe_ratio:
                new_height = img.height
                new_width = int(targe_ratio * new_height)
                left = (img.width - new_width) / 2
                top = 0
            else:
                new_width = img.width
                new_height = int(new_width / targe_ratio)
                left = 0
                top = (img.height - new_height) / 2

            right = left + new_width
            bottom = top + new_height

            img_cropped = img.crop((left, top, right, bottom))
            img_resized = img_cropped.resize(targe_size, Image.LANCZOS)

            img_resized.save(self.photo.path, optimeze=True, quality=70)

        