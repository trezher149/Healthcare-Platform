import requests

def add_user_id(url, userid, lineid) -> bool:
  res = requests.post(url, json={"userId": userid, "lineId": lineid})
  return res.status_code

def get_user_id(url, lineid):
  res = requests.post(url + "/user/getuseridfromlineid", json={"lineId": lineid})
  if res.status_code == 200:
    return res.json()["userId"]
  else:
    return 400


def send_calories(url, lineid, calories):
  res = requests.post(url + "/user/getuseridfromlineid", json={"lineId": lineid})
  if res.status_code == 400:
    return res.status_code
  data = res.json()
  res = requests.post(url + "/calories/updateCal", json={"userId": data["userId"], "calories": calories})
  if res.status_code >= 400:
    return res.status_code
  return res.json()