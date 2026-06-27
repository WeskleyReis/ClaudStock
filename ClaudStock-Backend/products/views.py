from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from products.models import Product
from products.serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
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

        products = Product.objects.filter(category__name=category_name)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)