import calendar
import random, json

class EmojiManager:

    def emoji_jsonfied(self, index, prodId, emojiId):
        emoji = {}
        emoji["index"] = index
        emoji["productId"] = prodId
        emoji["emojiId"] = emojiId
        return emoji

    def create_emoji(self, text: str, prodId: str | list, emojiId: list, index_init = 0):
        emojis = []
        index = index_init
        offset = 0
        length = len(text)
        i = 0
        if type(prodId) == str:
            while index < length:
                offset = text[index:].find("$")
                if offset == -1 or i == len(emojiId):
                    break
                emojis.append(self.emoji_jsonfied(index + offset, prodId, emojiId[i])) 
                index += offset + 1
                i += 1
        else:
            while index < length:
                offset = text[index:].find("$")
                if offset == -1 or i == len(emojiId):
                    break
                emojis.append(self.emoji_jsonfied(index + offset, prodId[i], emojiId[i])) 
                index += offset + 1
                i += 1
        return emojis

class DefaultMessage(EmojiManager):

    def default(self, msgs: dict, index_init = 0):
        index = index_init
        text = ""
        if type(msgs["Message"]) == list:
            for msg in msgs:
                text += msg
        else: text = msgs["Message"]

        #If message doesn't have emoji(s) 
        if "Emoji" not in msgs:
            return text, []

        if type(msgs["Emoji"]) == str:
            emojis = self.create_emoji(text, msgs["ProductId"], [msgs["Emoji"]], index)
        else:
            emojis = self.create_emoji(text, msgs["ProductId"], msgs["Emoji"], index)
        return text, emojis


class ResultMessage(EmojiManager):

    def calories(self, data: dict, lang = "th", index_init = 0):
        f = open(f"modules/../messages/{lang}/picture_data.json")
        msgs = json.loads(f.read())
        f.close()
        f = open(f"modules/../messages/{lang}/tips.json")
        tip_msgs = json.loads(f.read())
        f.close()
        calories_tip = tip_msgs["Calories"][random.randint(0, len(tip_msgs["Calories"]))]
        calories_advice = tip_msgs["CaloriesAdvice"][random.randint(0, len(tip_msgs["CaloriesAdvice"]))]
        index = index_init
        emojis = []
        emoji_ids = []
        calories_goal_msg = msgs["CaloriesGoal"]
        text = msgs["Title"]["Message"]
        product_id = msgs["Meta"]["ProductId"]
        emoji_ids.append(msgs["Title"]["Emoji"])
        if data["hasGoal"] and data["isActive"]:
            text += calories_goal_msg["Message"].format(data["caloriesTotal"], data["caloriesGoal"], data["daysLeft"])
            emoji_ids.append(calories_goal_msg["Emoji"])
            if data["isAchived"]:
                text += calories_goal_msg["Complete"]["Message1"]
                text += calories_goal_msg["Complete"]["Message2"].format(data['achiveScore'])
                emoji_ids.append(calories_goal_msg["Complete"]["Emoji"])
        text += msgs["ExerciseLvl"]["Message"]
        emoji_ids.append(msgs["ExerciseLvl"]["Emoji"])
        text += msgs["ExerciseLvl"]["LvlMsg"][data["activityLvl"]] + "\n"
        text += msgs["Score"]["Recent"]["Message"].format(data["score"])
        emoji_ids.append(msgs["Score"]["Recent"]["Emoji"])
        text += msgs["Score"]["Total"]["Message"].format(data["totalScore"]) + "\n\n"
        emojis.extend(self.create_emoji(text, product_id, emoji_ids, index))
        text += calories_tip
        if data["activityLvl"] == 0:
            text += "\nคำแนะนำ: " + calories_advice
        if not data["hasGoal"] and not data["isActive"]:
            if random.randint(0, 2) == 0:
                text += tip_msgs["noGoalSet"]
        return text, emojis
    
    def calories_arr(self, data_arr: list[dict]):
        text = ""
        emojis = []
        offset = 0
        for item in data_arr:
            text += "$ " + item["timestamp"] + "\n"
            text += f"{item['calories']:,} กิโลแคลอรี่\n\n"
            emojis.extend(self.create_emoji(text, "5ac21a18040ab15980c9b43e", ["129"], offset))
            offset = len(text)
        text = text[:len(text) - 2]
        return text, emojis
    
    def sleep(self, data: dict, lang = "th", index_init = 0):
        f = open(f"modules/../messages/{lang}/picture_data.json")
        msgs = json.loads(f.read())
        f.close
        f = open(f"modules/../messages/{lang}/tips.json")
        tip_msgs = json.loads(f.read())
        f.close()
        sleep_tip = tip_msgs["Sleep"][random.randint(0, len(tip_msgs["Sleep"]))]
        sleep_advice = tip_msgs["SleepAdvice"][random.randint(0, len(tip_msgs["SleepAdvice"]))]
        index = index_init
        emojis = []
        emoji_ids = []
        sleep_goal_msg = msgs["SleepGoal"]
        text = msgs["Title"]["Message"]
        product_id = msgs["Meta"]["ProductId"]
        emoji_ids.append(msgs["Title"]["Emoji"])
        if data["hasGoal"] and data["isActive"]:
            text += sleep_goal_msg["Message"].format(data["streakTotal"], data["streakGoal"])
            emoji_ids.append(sleep_goal_msg["Emoji"])
            if data["isAchived"]:
                text += sleep_goal_msg["Complete"]["Message1"]
                text += sleep_goal_msg["Complete"]["Message2"].format(data['achiveScore'])
                emoji_ids.append(sleep_goal_msg["Complete"]["Emoji"])
        text += msgs["SleepCond"]["Message"]
        emoji_ids.append(msgs["SleepCond"]["Emoji"])
        text += msgs["SleepCond"]["cond"][int(data["sleepCond"])] + "\n"
        text += msgs["Score"]["Recent"]["Message"].format(data["score"])
        emoji_ids.append(msgs["SleepGoal"]["Complete"]["Emoji"])
        text += msgs["Score"]["Total"]["Message"].format(data["totalScore"])
        emojis.extend(self.create_emoji(text, product_id, emoji_ids, index))
        text += sleep_tip
        if not data["sleepCond"]:
            text += "\nคำแนะนำ: " + sleep_advice
        else:
            text += sleep_tip
        if not data["hasGoal"] and not data["isActive"]:
            if random.randint(0, 2) == 0:
                text += tip_msgs["noGoalSet"]
        return text, emojis

    def sleep_arr(self, data_arr: list[dict]):
        text = ""
        emojis = []
        offset = 0
        for item in data_arr:
            text += "$ " + item["timestamp"] + "\n"
            hour = int(item["sleepDuration"]) // 60
            minute = int(item["sleepDuration"]) % 60
            if minute == 0:
                text += f"{hour} ชั่วโมง\n\n"
            else:
                text += f"{hour} ชั่วโมง {minute} นาที\n\n"
            emojis.extend(self.create_emoji(text, "5ac21a18040ab15980c9b43e", ["129"], offset))
            offset = len(text)
        text = text[:len(text) - 2]
        return text, emojis

    def score_arr(self, totalScore, data_arr: list[dict]):
        text = ""
        emojis = []
        offset = 0
        text += f'$ คะแนนที่ได้ทั้งหมด: {totalScore:,} คะแนน\n\n'
        emojis.extend(self.create_emoji(text, "5ac21a18040ab15980c9b43e", ["129"], offset))
        offset = len(text)
        for item in data_arr:
            text += "$ " + item["timestamp"] + "\n"
            text += f'{item["score"]:,} คะแนน\n\n'
            emojis.extend(self.create_emoji(text, "5ac21a18040ab15980c9b43e", ["129"], offset))
            offset = len(text)
        text = text[:len(text) - 2]
        return text, emojis

class GoalSetMessage(EmojiManager):

    def date_format(self, text: str, end_goal_time: str, end_days: int) -> str:
        date: list = end_goal_time.split(",")[0].split("/")
        return text.format(date[1], calendar.month_name[int(date[0])], int(date[2]) + 543, end_days)
    
    def calories_goal_msg(self, data: dict, lang = "th", index_init = 0):
        f = open(f"modules/../messages/{lang}/set_goals.json")
        msgs = json.loads(f.read())["Calories"]
        f.close()
        index = index_init
        emojis = []
        text: str = msgs["Message1"].format(data["caloriesGoal"])
        text += self.date_format(msgs["Message2"], data["endGoalTime"], data["endDays"])
        text += msgs["Message3"].format(data["scoreToGet"])
        emojis.extend(self.create_emoji(text, msgs["ProductId"], msgs["Emoji"], index))
        index = len(text)
        rand_msg = msgs["RandomMessages"][random.randint(0, 2)]
        text += rand_msg["Message"]
        emojis.extend(self.create_emoji(text, rand_msg["ProductId"], [rand_msg["Emoji"]], index))
        return text, emojis
    
    def sleep_goal_msg(self, data: dict, lang = "th", index_init = 0):
        f = open(f"modules/../messages/{lang}/set_goals.json")
        msgs = json.loads(f.read())["Sleep"]
        f.close()
        index = index_init
        emojis = []
        text: str = msgs["Message1"].format(data["streakGoal"])
        text += self.date_format(msgs["Message2"], data["endGoalTime"], data["endDays"])
        text += msgs["Message3"].format(data["scoreToGet"])
        emojis.extend(self.create_emoji(text, msgs["ProductId"], msgs["Emoji"], index))
        index = len(text)
        rand_msg = msgs["RandomMessages"][random.randint(0, 2)]
        text += rand_msg["Message"]
        emojis.extend(self.create_emoji(text, rand_msg["ProductId"], [rand_msg["Emoji"]], index))
        return text, emojis

class HelpMessage(EmojiManager):

    def general_msg(self, msgs: dict, prod_id: str, emoji_id: str):
        index = 0
        emojis = []
        text: str = msgs["Title"]
        emojis.extend(self.create_emoji(text, prod_id, [emoji_id], index))
        for msg in msgs["MessageList"]:
            text += msg
        return text, emojis
