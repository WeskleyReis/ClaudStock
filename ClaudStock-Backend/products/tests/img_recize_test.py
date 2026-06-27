import os
import tempfile

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from products.models import Product, Category
from PIL import Image


class ProductImageTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name='Perfume')

    def create_test_image(self, size=(500, 300)):
        temp_file = tempfile.NamedTemporaryFile(suffix='.jpg', delete=False)
        image = Image.new('RGB', size, color=(255, 0, 0))
        image.save(temp_file, 'JPEG')
        temp_file.seek(0)
        return temp_file

    def test_image_crop_recise_on_save(self):
        temp_image = self.create_test_image(size=(500, 300))

        with open(temp_image.name, 'rb') as f:
            upload_image = SimpleUploadedFile(
                name='test_image.jpg',
                content=f.read(),
                content_type='Image/jpeg'
            )

        product = Product.objects.create(
            name='Teste Produto',
            category=self.category,
            price=10.0,
            quantity=1,
            photo=upload_image
        )

        img = Image.open(product.photo.path)
        self.assertEqual(img.size, (320, 320))

        # Cleanup
        img.close()
        product.delete()

    def test_image_crop_when_smaller_than_target(self):
        temp_image = self.create_test_image(size=(100, 100))

        with open(temp_image.name, 'rb') as f:
            upload_image = SimpleUploadedFile(
                name='small_image.jpg',
                content=f.read(),
                content_type='image/jpeg'
            )

        product = Product.objects.create(
            name='Produto Small Image',
            category=self.category,
            price=10.0,
            quantity=1,
            photo=upload_image
        )

        img = Image.open(product.photo.path)
        self.assertEqual(img.size, (320, 320))

        # Cleanup
        img.close()
        product.photo.delete()
        temp_image.close()
        os.remove(temp_image.name)

    def test_signal_handles_missing_file_gracefully(self):
        temp_image = self.create_test_image()
        with open(temp_image.name, 'rb') as f:
            upload_image = SimpleUploadedFile(
                name='signal_test_missing.jpg',
                content=f.read(),
                content_type='image/jpeg'
            )

        product = Product.objects.create(
            name='Produto Missing File',
            category=self.category,
            price=10.0,
            quantity=1,
            photo=upload_image
        )

        os.remove(product.photo.path)

        try:
            product.delete()
        except Exception as e:
            self.fail(f"Deleting product raised an exception: {e}")

        # Cleanup
        temp_image.close()
        os.remove(temp_image.name)

    def test_signal_pre_save_deletes_old_image(self):
        temp_image1 = self.create_test_image(size=(100, 100))
        temp_image2 = self.create_test_image(size=(200, 200))

        with open(temp_image1.name, 'rb') as f1, open(temp_image2.name, 'rb') as f2:
            image1 = SimpleUploadedFile(
                name='image1.jpg', content=f1.read(), content_type='image/jpeg'
            )
            image2 = SimpleUploadedFile(
                name='image2.jpg', content=f2.read(), content_type='image/jpeg'
            )

        product = Product.objects.create(
            name='Produto Update Test',
            category=self.category,
            price=10.0,
            quantity=1,
            photo=image1
        )

        old_path = product.photo.path
        self.assertTrue(os.path.exists(old_path))

        product.photo = image2
        product.save()

        self.assertFalse(os.path.exists(old_path))

        new_path = product.photo.path
        self.assertTrue(os.path.exists(new_path))

        # Cleanup
        product.photo.delete()
        temp_image1.close()
        temp_image2.close()
        os.remove(temp_image1.name)
        os.remove(temp_image2.name)
