from django.urls import path
from .views import Master_Sign_Up, Sign_Up, Log_Out, Log_In, Info

urlpatterns = [
    path("signup/masters/", Master_Sign_Up.as_view(), name="master_sign_up"),
    path("signup/", Sign_Up.as_view(), name="sign_up"),
    path("logout/", Log_Out.as_view(), name="log_out"),
    path("login/", Log_In.as_view(), name="log_in"),
    path("info/", Info.as_view(), name="info"),
]