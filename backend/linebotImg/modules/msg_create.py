import calendar
import random

class MessageCreate:

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

    def default(self, msgs: dict, index_init = 0):
        index = index_init
        text = ""
        if type(msgs["Message"]) == list:
            for msg in msgs:
                text += msg
        else: text = msgs["Message"]
        
        if "Emoji" not in msgs:
            return text, []

        if type(msgs["Emoji"]) == str:
            emojis = self.create_emoji(text, msgs["ProductId"], [msgs["Emoji"]], index)
        else:
            emojis = self.create_emoji(text, msgs["ProductId"], msgs["Emoji"], index)
        return text, emojis
        
    def score(self, data: dict, msgs: dict, index_init = 0):
        index = index_init

class ResultMessage(MessageCreate):

    def calories(self, data: dict, msgs: dict, index_init = 0):
        index = index_init
        emojis = []
        emoji_ids = []
        calories_goal_msg = msgs["CaloriesGoal"]
        text = msgs["Title"]["Message"]
        product_id = msgs["Meta"]["ProductId"]
        emoji_ids.append(msgs["Title"]["Emoji"])
        if data["hasGoal"] and data["isActive"]:
            percent = round((data["caloriesTotal"] / data["caloriesGoal"]) * 100, 1)
            if percent > 100:
                percent = 100
            text += calories_goal_msg["Message"].format(data["caloriesTotal"], data["caloriesGoal"], percent)
            emoji_ids.append(calories_goal_msg["Emoji"])
            if data["isAchived"]:
                text += calories_goal_msg["Complete"]["Message1"]
                text += calories_goal_msg["Complete"]["Message2"].format(data['achiveScore'])
                emoji_ids.append(calories_goal_msg["Complete"]["Emoji"])
        text += msgs["Score"]["Recent"]["Message"].format(data["score"])
        emoji_ids.append(msgs["CaloriesGoal"]["Complete"]["Emoji"])
        text += msgs["Score"]["Total"]["Message"].format(data["totalScore"])
        emojis.extend(self.create_emoji(text, product_id, emoji_ids, index))
        return text, emojis
    
    def sleep(self, data: dict, msgs: dict, index_init = 0):
        index = index_init
        emojis = []
        emoji_ids = []
        sleep_goal_msg = msgs["SleepGoal"]
        text = msgs["Title"]["Message"]
        product_id = msgs["Meta"]["ProductId"]
        emoji_ids.append(msgs["Title"]["Emoji"])
        if data["hasGoal"] and data["isActive"]:
            percent = round((data["streakTotal"] / data["streakGoal"]) * 100, 1)
            if percent > 100:
                percent = 100
            text += sleep_goal_msg["Message"].format(data["caloriesTotal"], data["caloriesGoal"], percent)
            emoji_ids.append(sleep_goal_msg["Emoji"])
            if data["isAchived"]:
                text += sleep_goal_msg["Complete"]["Message1"]
                text += sleep_goal_msg["Complete"]["Message2"].format(data['achiveScore'])
                emoji_ids.append(sleep_goal_msg["Complete"]["Emoji"])
        text += msgs["Score"]["Recent"]["Message"].format(data["score"])
        emoji_ids.append(msgs["CaloriesGoal"]["Complete"]["Emoji"])
        text += msgs["Score"]["Total"]["Message"].format(data["totalScore"])
        emojis.extend(self.create_emoji(text, product_id, emoji_ids, index))
        return text, emojis

class GoalSetMessage(MessageCreate):

    def date_format(self, text: str, end_goal_time: str, end_days: int) -> str:
        date: list = end_goal_time.split(",")[0].split("/")
        return text.format(date[1], calendar.month_name[int(date[0])], int(date[2]) + 543, end_days)

    def calories_goal_msg(self, data: dict, msgs: dict, index_init = 0):
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
    
    def sleep_goal_msg(self, data: dict, msgs: dict, index_init = 0):
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
