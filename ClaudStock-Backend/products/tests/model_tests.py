from django.test import TestCase
from django.db import IntegrityError
from products.models import Product, Category


class ProductModelTest(TestCase):
    def setUp(self):
        self.perfume_category = Category.objects.create(name='Perfume')

    def test_create_product(self):
        product = Product.objects.create(
            name='Kaiak Colônia Masculino',
            category=self.perfume_category,
            price=78.99,
            quantity=4,
            barcode='1234567890123'
        )

        self.assertEqual(product.name, 'Kaiak Colônia Masculino')
        self.assertEqual(product.category.name, 'Perfume')
        self.assertEqual(product.price, 78.99)
        self.assertEqual(product.quantity, 4)
        self.assertEqual(product.barcode, '1234567890123')

    def test_product_optional_fields(self):
        product = Product.objects.create(
            name='Lavanda',
            category=self.perfume_category,
            price=45.99,
            quantity=2
        )

        self.assertIsNone(product.barcode)
        self.assertEqual(product.photo, None)

    def test_unique_barcode(self):
        Product.objects.create(
            name='Produto 1',
            category=self.perfume_category,
            price=25.0,
            quantity=5,
            barcode='111222333444'
        )
        with self.assertRaises(IntegrityError):
            Product.objects.create(
                name='Produto 2',
                category=self.perfume_category,
                price=28.0,
                quantity=3,
                barcode='111222333444'
            )

    def test_str_method(self):
        product = Product.objects.create(
            name='Perfume Floral',
            category=self.perfume_category,
            price=80.0,
            quantity=1
        )
        self.assertEqual(str(product), 'Perfume Floral')


class CategoryModelTest(TestCase):
    def test_create_category(self):
        category = Category.objects.create(name='Perfume')

        self.assertEqual(category.name, 'Perfume')

    def test_unique_category(self):
        Category.objects.create(name='Creme')

        with self.assertRaises(IntegrityError):
            Category.objects.create(name='Creme')

    def test_str_method(self):
        category = Category.objects.create(name='Desodorante')

        self.assertEqual(str(category), 'Desodorante')
