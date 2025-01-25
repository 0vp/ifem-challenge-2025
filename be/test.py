import requests as req

BASE_URL = "http://localhost:5000"

response = req.post(f"{BASE_URL}/respond", json={"input": "What is the capital of the United States?"})
print(response.json())