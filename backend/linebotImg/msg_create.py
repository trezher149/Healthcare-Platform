class MessageCreate:

    def emoji_create(self, index, prodId, emojiId):
        emoji = {}
        emoji["index"] = index
        emoji["productId"] = prodId
        emoji["emojiId"] = emojiId
        return emoji

    def default(self, text: str, prodId = [], emojiId = []):
        emojis = []
        if text.find("$") == -1:
            return text, emojis
        if len(prodId) == 0:
            return text, emojis
        offset = 0
        index = text.find("$")
        length = len(text)
        i = 0
        emojis.append(self.emoji_create(index, prodId[i], emojiId[i])) 
        index += 1
        while index < length:
            offset = text[index:].find("$")
            if offset == -1 or i == len(prodId):
                break
            emojis.append(self.emoji_create(index + offset, prodId[i], emojiId[i])) 
            index += offset + 1
            i += 1
        return text, emojis
        

    def calories(self, data: dict):
        index = 0
        emojis = []
        text = "$ ความคืบหน้า\n"
        emojis.append(self.emoji_create(index, "5ac21a18040ab15980c9b43e", "151"))
        index = len(text)
        if data["hasGoal"] and data["isActive"]:
            percent = round((data["caloriesTotal"] / data["caloriesGoal"]) * 100, 2)
            text += f"{data['caloriesTotal']:,}/{data['caloriesGoal']:,} kcal ({percent}%)\n"
            index = len(text)
            if data["isAchived"]:
                text += f"$ ยินดีด้วยกับความสำเร็จนะคะ ^^ " 
                emojis.append(self.emoji_create(index, "5ac21a18040ab15980c9b43e", "129"))
                text += f"คุณได้คะแนนเพิ่มจากความสำเร็จ {data['achiveScore']:,} คะแนน\n"
                index = len(text)
        text += f"$ คุณได้ {data['score']:,} คะแนน"
        emojis.append(self.emoji_create(index, "5ac21a18040ab15980c9b43e", "129"))
        index = len(text)
        text += f" และวันนี้คุณได้คะแนนทั้งหมด {data['totalScore']:,} คะแนน"
        if data["isAchived"]:
            text += f"ยินดีด้วยกับความสำเร็จนะคะ~ $"
            index = (len(text) - 1)
            emojis.append(self.emoji_create(index, "5ac21a18040ab15980c9b43e", "071"))
        return text, emojis