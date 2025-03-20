from django.urls import path
from . import views


urlpatterns = [
    # path("test/member/",views.MemeberView.as_view(),name="member-view"),
    path('members/', views.create_member, name='create_member'),
    path('contacts/', views.create_contact, name='create_contact'),


]