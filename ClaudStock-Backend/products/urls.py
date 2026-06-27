from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import SimpleRouter
from products.views import ProductViewSet
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView
)

app_name = 'products'

product = SimpleRouter()
product.register('products', ProductViewSet, basename='product')

urlpatterns = [
    path(
        'schema/',
        SpectacularAPIView.as_view(),
        name='schema'
    ),
    path(
        'schema/swagger-ui/',
        SpectacularSwaggerView.as_view(url_name='products:schema'),
        name='swagger-ui'
    ),
    path(
        'schema/redoc/',
        SpectacularRedocView.as_view(url_name='products:schema'),
        name='redoc'
    ),
]

urlpatterns += product.urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)