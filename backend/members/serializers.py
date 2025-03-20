from rest_framework import serializers
from .models import Member, Contact

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'
        extra_kwargs = {
            'middle_name': {'required': False},
            'office_address': {'required': False},
            'prayer_request': {'required': False}
        }

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'