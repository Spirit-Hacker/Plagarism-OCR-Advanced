from django.urls import path
from . import views


urlpatterns = [
    path('', views.home,name='plagiarism-check-mainpage'),
    path('compare/', views.fileCompare,name='compare'), 
    path('test/', views.test,name='Test'),
    path('filetest/', views.filetest,name='filetest'),
    path('image_plagiarism_check/', views.image_plagiarism_check, name='image_plagiarism_check'),
    path('twofiletest1/', views.twofiletest1,name='twofiletest1'),
    path('twofilecompare1/', views.twofilecompare1,name='twofilecompare1'),
]
