
import requests
from dotenv import load_dotenv
import os
load_dotenv()

client_id = os.environ.get('CLIENT_ID')
client_secret = os.environ.get('CLIENT_SECRET')

url = 'https://accounts.spotify.com/api/token'
data = {
    'grant_type': 'client_credentials'
}
headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
}
auth = ('YOUR-CLIENT-ID', 'YOUR-CLIENT-SECRET')

response = requests.post(url, data=data, headers=headers, auth=auth)

if response.status_code == 200:
    response_json = response.json()
    print(response_json)
else:
    print('Error:', response.status_code)


