import requests

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

def send_sleep(url, user_id: str, sleep_minutes: int) -> tuple[dict, int]:
  res = requests.post(url + "/sleep/updateSleep", json={"userId": user_id, "sleepDur": sleep_minutes})
  if res.status_code >= 400:
    return {}, res.status_code
  return res.json(), res.status_code