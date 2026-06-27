from rest_framework.test import APITestCase
from rest_framework import status
from products.models import Product, Category
from django.urls import reverse


class ProductAPITest(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(name='Perfume')
        self.product_data = {
            'name': 'Kaiak Colônia Maculina',
            'category': 'Perfume',
            'price': 78.99,
            'quantity': 4,
            'barcode': '1234567890123'
        }
    
    def test_create_product(self):
        url = reverse('products:product-list')
        response = self.client.post(url, self.product_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(Product.objects.get().name, 'Kaiak Colônia Maculina')

    def test_list_products(self):
        Product.objects.create(
            name='Outro Produto',
            category=self.category,
            price=50.99,
            quantity=2
        )
        url = reverse('products:product-list')
        response = self.client.get(url, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_retrieve_product(self):
        product = Product.objects.create(
            name='Perfume Floral',
            category=self.category,
            price=80.0,
            quantity=1
        )

        url = reverse('products:product-detail', args=[product.id])
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Perfume Floral')

    def test_update_product(self):
        product = Product.objects.create(
            name='Perfume Velho',
            category=self.category,
            price=60.0,
            quantity=1
        )

        url = reverse('products:product-detail', args=[product.id])
        updated_data = self.product_data.copy()
        updated_data['name'] = 'Perfume Novo'
        response = self.client.put(url, updated_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Product.objects.get(id=product.id).name, 'Perfume Novo')

    def test_parcial_update_product(self):
        product = Product.objects.create(
            name='Perfume Velho',
            category=self.category,
            price=60.0,
            quantity=1
        )

        url = reverse('products:product-detail', args=[product.id])
        response = self.client.patch(url, {'name': 'Perfume Parcial'}, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Product.objects.get(id=product.id).name, 'Perfume Parcial')

    def test_delete_product(self):
        product = Product.objects.create(
            name='Produto a Deletar',
            category=self.category,
            price=40.0,
            quantity=2
        )

        url = reverse('products:product-detail', args=[product.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Product.objects.count(), 0)

    def test_list_products_by_category(self):
        for i in range(5):
            Product.objects.create(
                name=f'Produto {i}',
                category=self.category,
                price=99.90,
                quantity=1
            )

        url = reverse('products:product-by-category', kwargs={'category_name': self.category.name})
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 5)

        for product in response.data:
            self.assertEqual(product['category'], self.category.name)