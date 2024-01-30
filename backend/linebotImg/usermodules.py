import requests

def add_user_id(url, lineid, userid) -> bool:
  res = requests.post(url, json={"userId": userid, "lineId": lineid})
  if res.status_code == 200:
    return True
  return False

def get_user_id(url, lineid):
  res = requests.post(url + "/user/getuseridfromlineid", json={"lineId": lineid})
  if res.status_code == 200:
    return res.json()["userId"]
  else:
    return 400


def send_calories(url, lineid, calories):
  res = requests.post(url + "/user/getuseridfromlineid", json={"lineId": lineid})
  if res.status_code == 400:
    return str(res.status_code)
  data = res.json()
  res = requests.post(url + "/calories/updateCal", json={"userId": data["userId"], "calories": calories})
  return res.json()["score"]