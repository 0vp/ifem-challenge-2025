import requests as req
import random

BASE_URL = "https://ifem-award-mchacks-2025.onrender.com/api/v1"

PATIENT_IDX = None
QUEUE_INFORMATION = None
STAT_INFORMATION = None

def get_queue():
    global QUEUE_INFORMATION, PATIENT_IDX

    if not QUEUE_INFORMATION:
        QUEUE_INFORMATION = req.get(f"{BASE_URL}/queue").json()

        while not PATIENT_IDX or QUEUE_INFORMATION["patients"][PATIENT_IDX]["status"]['current_phase'] in ["discharged", "treatment"]:
            PATIENT_IDX = random.randint(0, len(QUEUE_INFORMATION["patients"]))
    return QUEUE_INFORMATION

def get_stats():
    global STAT_INFORMATION

    if not STAT_INFORMATION:
        STAT_INFORMATION = req.get(f"{BASE_URL}/stats/current").json()
    return STAT_INFORMATION

def get_position():
    global QUEUE_INFORMATION, PATIENT_IDX

    total_waiting = QUEUE_INFORMATION['waitingCount']
    current_pos = QUEUE_INFORMATION['patients'][PATIENT_IDX]['queue_position']['global']

    if current_pos > 0:
        QUEUE_INFORMATION['patients'][PATIENT_IDX]['queue_position']['global'] -= 1

    return {
        'current': QUEUE_INFORMATION['patients'][PATIENT_IDX]['queue_position']['global'],
        'max': total_waiting,
        'rel': int(9 * ((total_waiting - current_pos) / total_waiting))
    }

def get_patient():
    return QUEUE_INFORMATION['patients'][PATIENT_IDX]

def reset():
    global QUEUE_INFORMATION, STAT_INFORMATION, PATIENT_IDX

    QUEUE_INFORMATION = None
    STAT_INFORMATION = None
    PATIENT_IDX = None

    get_queue()
    get_stats()    

print(get_queue())
print(get_stats())