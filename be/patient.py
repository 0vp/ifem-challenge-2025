import requests as req

BASE_URL = "https://ifem-award-mchacks-2025.onrender.com/api/v1"

QUEUE_INFORMATION = None

def get_queue():
    global QUEUE_INFORMATION

    QUEUE_INFORMATION = req.get(f"{BASE_URL}/queue").json()
    return QUEUE_INFORMATION

def get_stats():
    response = req.get(f"{BASE_URL}/stats/current").json()
    return response

# print(get_queue())
print(get_stats())