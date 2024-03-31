import requests
from datetime import datetime, timedelta
from dateutil import parser
import pytz

def add_user_id(url, userid, lineid) -> bool:
  res = requests.post(url, json={"userId": userid, "lineId": lineid})
  return res.status_code

def get_user_id(url, lineid) -> tuple[str, int]:
  res = requests.post(url + "/user/getuseridfromlineid", json={"lineId": lineid})
  if res.status_code == 404:
    return "", res.status_code
  return res.json()["userId"], res.status_code


def send_calories(url, user_id: str, calories) -> tuple[dict, int]:
  res = requests.post(url + "/calories/updateCal", json={"userId": user_id, "calories": calories})
  if res.status_code >= 400:
    return {}, res.status_code
  return res.json(), res.status_code

def get_calories(url, line_id: str, length_days = 10):
  res = requests.post(url + "/user/getuseridfromlineid", json={"lineId": line_id})
  if res.status_code == 404:
    return {}, res.status_code
  user_id = res.json()["userId"]

  res = requests.post(url + "/calories/getCal", json={"userId": user_id, "lengthDays": length_days})
  if res.status_code >= 400:
    return {}, res.status_code
  cal_arr = res.json()
  for i in range(len(cal_arr)):
    time_format = parser.parse(cal_arr[i]["timestamp"]).astimezone(pytz.timezone("Asia/Bangkok"))
    cal_arr[i]["timestamp"] = time_format.strftime("%d/%m/%Y (%H:%M น.)")
  
  return cal_arr, res.status_code


def send_sleep(url, user_id: str, sleep_minutes: int) -> tuple[dict, int]:
  res = requests.post(url + "/sleep/updateSleep", json={"userId": user_id, "sleepDur": sleep_minutes})
  if res.status_code >= 400:
    return {}, res.status_code
  return res.json(), res.status_code

def get_sleep(url, line_id: str, length_days = 10):
  res = requests.post(url + "/user/getuseridfromlineid", json={"lineId": line_id})
  if res.status_code == 404:
    return {}, res.status_code
  user_id = res.json()["userId"]

  res = requests.post(url + "/sleep/getSleep", json={"userId": user_id, "lengthDays": length_days})
  if res.status_code >= 400:
    return {}, res.status_code
  sleep_arr = res.json()
  for i in range(len(sleep_arr)):
    time_format = parser.parse(sleep_arr[i]["timestamp"]).astimezone(pytz.timezone("Asia/Bangkok"))
    time_diff = time_format - timedelta(days=1)
    sleep_arr[i]["timestamp"] = time_diff.strftime("%d/%m/%Y")
  
  return sleep_arr, res.status_code