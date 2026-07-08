from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import action
from products.models import Product, Category
from products.serializers import ProductSerializer
from django.http import HttpResponse

import csv
from io import TextIOWrapper

from decimal import Decimal


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().select_related('category')
    serializer_class = ProductSerializer

    @action(
            detail=False,
            methods=['get'],
            url_path='by-category/(?P<category_name>[^/.]+)'
        )
    def by_category(self, request, category_name=None):
        """
        Lista todos os produtos de uma categoria específica.
        Ex: /api/v1/products/by-category/Perfume/
        """

        products = self.get_queryset().filter(category__name=category_name)
        serializer = self.get_serializer(products, many=True)

        return Response(serializer.data)
    
    @action(
        detail=False,
        methods=['get'],
        url_path='export'
    )
    def export_products(self, request):
        """
            Exporta o arquivo CSV dos produtos.
        """

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = (
            'attachment; filename="produtos-claudstock.csv"'
        )
        writer = csv.writer(response)

        writer.writerow([

            'id',
            'name',
            'category',
            'price',
            'quantity',
            'barcode',
        ])
        
        for product in self.get_queryset():
            writer.writerow([
                product.id, 
                product.name,
                product.category.name,
                product.price, 
                product.quantity, 
                product.barcode,
            ])

        return response

    @action(
        detail=False,
        methods=['post'],
        url_path='import',
        parser_classes=[MultiPartParser]
    )
    def import_products(self, request):
        file = request.data.get('file')

        if file is None:
            return Response(
                {"error": "Nenhum arquivo enviado."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        csv_file = TextIOWrapper(file.file, encoding="utf-8-sig")
        reader = csv.DictReader(csv_file)

        total = 0

        for row in reader:
            category, _ = Category.objects.get_or_create(
                name=row['category']
            )
            Product.objects.update_or_create(
                barcode=row['barcode'],
                defaults={
                    "name": row['name'],
                    "category": category,
                    "price": Decimal(row['price']),
                    "quantity": int(row.get('quantity') or 0),
                }
            )

            total += 1

        return Response(
            {
                "message": "Produtos importados com sucesso.",
                "total": f"{total} produtos importados.",
            },
            status=status.HTTP_201_CREATED
        )