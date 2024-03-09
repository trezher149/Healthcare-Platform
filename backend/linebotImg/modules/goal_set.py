import requests
from modules.msg_create import GoalSetMessage

class GoalSet(GoalSetMessage):

  def __init__(self, msgs) -> None:
    self.msgs: object = msgs
    self.__URL = "http://cheffy:14000/api"
  
  def calories_goal(self, user_id: str, calories: int = 0, period_day: int = 7): 
    res = requests.post(self.__URL + "/calories/setCalGoal", json={
      "userId": user_id, "caloriesGoal": calories, "endDays": period_day
    })
    if res.status_code >= 400:
      return res.status_code
    data = res.json()
    return self.calories_goal_msg(data, self.msgs["Calories"])
    

  def sleep_goal(self, user_id: str, sleep_days: int, period_day: int = 14):
    res = requests.post(self.__URL + "/sleep/setSleepGoal", json={
      "userId": user_id, "sleepDays": sleep_days, "endDays": period_day
    })
    data = res.json()
    return self.sleep_goal_msg(data, self.msgs["Sleep"])