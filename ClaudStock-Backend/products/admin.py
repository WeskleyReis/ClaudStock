from django.contrib import admin
from products.models import Product, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')
    search_fields = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'price', 'quantity')
    list_display_links = ('id', 'name', 'category')
    list_filter = ('name', 'category', 'price', 'quantity')
    search_fields = ('name', 'category')