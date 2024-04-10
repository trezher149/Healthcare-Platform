import requests
from datetime import datetime, timedelta
from dateutil import parser
import pytz
import jwt

def _gen_bearer(id_obj: dict):
  key = open("modules/keys/linebot-private.pem", "r").read()
  token = jwt.encode(id_obj, key, "RS256")
  return "Bearer " + token

def _verify_token(token: str):
  key = open("modules/keys/backend-public.pem", "r").read()
  return jwt.decode(token, key, algorithms=["RS256"])

def get_user_id(url, line_id):
  bearer = _gen_bearer({"lineId": line_id})
  res = requests.post(url + "/user/getuseridfromlineid", headers={"Authorization": bearer})
  if res.status_code >= 400:
    return "", res.status_code
  decoded = _verify_token(res.headers["Authorization"].split(" ")[1])
  return decoded["userId"], res.status_code

def add_user_id(url, user_id, lineid) -> bool:
  bearer = _gen_bearer({"userId": user_id, "lineId": lineid})
  res = requests.post(url, headers={"Authorization": bearer})
  return res.status_code

def send_calories(url, user_id: str, calories) -> tuple[dict, int]:
  bearer = _gen_bearer({"userId": user_id})
  res = requests.post(url + "/calories/updateCal", headers={"Authorization": bearer}, json={"calories": calories})
  if res.status_code >= 400:
    return {}, res.status_code
  decoded = _verify_token(res.json()["payload"])
  return decoded, res.status_code

def get_calories(url, line_id: str, length_days = 10):
  bearer = _gen_bearer({"lineId": line_id})
  res = requests.post(url + "/user/getuseridfromlineid", headers={"Authorization": bearer})
  if res.status_code == 404:
    return {}, res.status_code
  user_id = _verify_token(res.headers["Authorization"].split(" ")[1])["userId"]

  bearer = _gen_bearer({"userId": user_id})
  res = requests.post(url + "/calories/getCal", headers= {"Authorization": bearer}, json={"lengthDays": length_days})
  if res.status_code >= 400:
    return {}, res.status_code
  cal_arr = _verify_token(res.json()["payload"])["data"]
  for i in range(len(cal_arr)):
    time_format = parser.parse(cal_arr[i]["timestamp"]).astimezone(pytz.timezone("Asia/Bangkok"))
    cal_arr[i]["timestamp"] = time_format.strftime("%d/%m/%Y (%H:%M น.)")
  
  return cal_arr, res.status_code

def send_sleep(url, user_id: str, sleep_minutes: int) -> tuple[dict, int]:
  bearer = _gen_bearer({"userId": user_id})
  res = requests.post(url + "/sleep/updateSleep", headers={"Authorization": bearer}, json={"sleepDur": sleep_minutes})
  if res.status_code >= 400:
    return {}, res.status_code
  decoded = _verify_token(res.json()["payload"])
  return decoded, res.status_code

def get_sleep(url, line_id: str, length_days = 10):
  bearer = _gen_bearer({"lineId": line_id})
  res = requests.post(url + "/user/getuseridfromlineid", headers={"Authorization": bearer})
  if res.status_code == 404:
    return {}, res.status_code
  user_id = _verify_token(res.headers["Authorization"].split(" ")[1])["userId"]

  bearer = _gen_bearer({"userId": user_id})
  res = requests.post(url + "/sleep/getSleep", headers={"Authorization": bearer}, json={"lengthDays": length_days})
  if res.status_code >= 400:
    return {}, res.status_code
  sleep_arr = _verify_token(res.json()["payload"])["data"]
  for i in range(len(sleep_arr)):
    time_format = parser.parse(sleep_arr[i]["timestamp"]).astimezone(pytz.timezone("Asia/Bangkok"))
    time_diff = time_format - timedelta(days=1)
    sleep_arr[i]["timestamp"] = time_diff.strftime("%d/%m/%Y")
  
  return sleep_arr, res.status_code