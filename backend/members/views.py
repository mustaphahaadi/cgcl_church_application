from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MemberSerializer, ContactSerializer
from drf_yasg.utils import swagger_auto_schema
from django.shortcuts import render, redirect
from .forms import TestimonyForm
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from .models import Sermon, Testimony
from .serializers import SermonSerializer, TestimonySerializer

class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class SermonViewSet(viewsets.ModelViewSet):
    queryset = Sermon.objects.all()
    serializer_class = SermonSerializer
    pagination_class = CustomPagination

class TestimonyViewSet(viewsets.ModelViewSet):
    queryset = Testimony.objects.all()
    serializer_class = TestimonySerializer
    pagination_class = CustomPagination


# class MemeberView(APIView):
#     permission_classes  = (AllowAny,)
#     serializer_class = MemberSerializer
#     queryset = Member.objects.all()

#     @swagger_auto_schema(query_serializer=MemberSerializer,method="get")
#     @api_view(['GET'])
#     def get(self,*args,**kwargs):
#         pass
    
#     def post(self,*args,**kwargs):
#         pass

# @swagger_auto_schema(query_serializer=MemberSerializer,method="post")
@api_view(['POST'])
def create_member(request):
    if request.method == 'POST':
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_contact(request):
    if request.method == 'POST':
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



def submit_testimony(request):
    if request.method == 'POST':
        form = TestimonyForm(request.POST, request.FILES)
        if form.is_valid():
            testimony = form.save(commit=False)
            testimony.user = request.user
            testimony.save()

            # Send email notification
            send_mail(
                'New Testimony Submitted',
                f'A new testimony has been submitted by {testimony.user.username}.',
                settings.DEFAULT_FROM_EMAIL,
                ['admin@example.com'],  # Replace with your email
                fail_silently=False,
            )
            return redirect('success_url')  # Redirect to a success page
    else:
        form = TestimonyForm()
    return render(request, 'submit_testimony.html', {'form': form})