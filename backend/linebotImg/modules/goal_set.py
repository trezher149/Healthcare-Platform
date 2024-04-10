import requests
from modules.msg_create import GoalSetMessage
import jwt

def _gen_bearer(id_obj: dict):
  key = open("modules/keys/linebot-private.pem", "r").read()
  token = jwt.encode(id_obj, key, "RS256")
  return "Bearer " + token

def _verify_token(token: str):
  key = open("modules/keys/backend-public.pem", "r").read()
  return jwt.decode(token, key, algorithms=["RS256"])

class GoalSet(GoalSetMessage):

  def __init__(self, msgs) -> None:
    self.msgs: object = msgs
    self.__URL = "http://cheffy:14000/api"
  
  def calories_goal(self, user_id: str, calories: int = 0, period_day: int = 7): 
    bearer = _gen_bearer({"userId": user_id})
    res = requests.post(self.__URL + "/calories/setCalGoal", headers={"Authorization": bearer}, 
      json={ "caloriesGoal": calories, "endDays": period_day}
    )
    if res.status_code >= 400:
      return res.status_code
    decoded = _verify_token(res.json()["payload"])
    return self.calories_goal_msg(decoded, self.msgs["Calories"])
    

  def sleep_goal(self, user_id: str, sleep_days: int, period_day: int = 14):
    bearer = _gen_bearer({"userId": user_id})
    res = requests.post(self.__URL + "/sleep/setSleepGoal", headers={"Authorization": bearer},
        json={"sleepDays": sleep_days, "endDays": period_day}
    )
    if res.status_code >= 400:
      return res.status_code
    decoded = _verify_token(res.json()["payload"])
    return self.sleep_goal_msg(decoded, self.msgs["Sleep"])