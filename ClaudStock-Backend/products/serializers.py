from decimal import Decimal
from rest_framework import serializers
from products.models import Product, Category


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField()
    price = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        min_value=Decimal('0.01')
    )

    class Meta:
        model = Product
        fields = ('id', 'name', 'category', 'price', 'quantity', 'barcode', 'photo')

    def create(self, validated_data):
        category_name = validated_data.pop('category')
        category, _ = Category.objects.get_or_create(name=category_name)
        product = Product.objects.create(category=category, **validated_data)
        
        return product
    
    def update(self, instance, validated_data):
        category_name = validated_data.pop('category', None)

        if category_name is not None:
            category, _ = Category.objects.get_or_create(name=category_name)
            instance.category = category

        return super().update(instance, validated_data)