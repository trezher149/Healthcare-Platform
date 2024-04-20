# Original code by Yang-33 (https://github.com/line/line-bot-sdk-python/blob/master/examples/flask-echo/app.py#L51)
# Edit and modified by trezher149 (Thunyavat Thanakornsombat)


from flask import Flask, request, abort
from logging.config import dictConfig
import ngrok, os, requests, json, time
from dotenv import load_dotenv
from datetime import datetime
import modules.usermodules as um
from modules.msg_create import DefaultMessage, ResultMessage, HelpMessage
from modules.picture_proc import PictureProcess as PicProc
from modules.goal_set import GoalSet

load_dotenv()

f = open("messages/th/defaults.json")
DEF_MSG_TH: dict= json.loads(f.read())
f.close()

CHANNEL_ACCESS_TOKEN = os.environ.get("CHANNEL_ACCESS_TOKEN")
CHANNEL_SECRET = os.environ.get("CHANNEL_SECRET")

IMAGE_LOCATION = os.environ.get("IMAGE_LOCATION")
IMAGE_AMOUNT = 14

URL = "http://cheffy:14000/api"
USER_URL = URL + "/user"
CAL_URL = URL + "/calories"
SLEEP_URL = URL + "/sleep"

from linebot.v3 import (
    WebhookHandler
)
from linebot.v3.exceptions import (
    InvalidSignatureError
)
from linebot.v3.messaging import (
    Configuration,
    ApiClient,
    MessagingApi,
    ReplyMessageRequest,
    TextMessage,
)
from linebot.v3.webhooks import (
    MessageEvent,
    TextMessageContent,
    ImageMessageContent,
)

dictConfig({
    'root':{
        "level": 'INFO'
    },
    "version": 1
})

app = Flask(__name__)

configuration = Configuration(access_token=CHANNEL_ACCESS_TOKEN)
handler = WebhookHandler(CHANNEL_SECRET)

DefaultMessage = DefaultMessage()
ResultMessage = ResultMessage()
HelpMessage = HelpMessage()

def date_format():
    today = datetime.now()
    date_str = f"{today.day}-{today.month}-{today.year}_{today.hour}-{today.minute}-{today.second}"
    return date_str

@app.route("/test", methods=["GET"])
def home():
    return "Hello world"

@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        app.logger.info("Invalid signature. Please check your channel access token/channel secret.")
        abort(400)

    return 'OK'

#LINE bot functionalities with text
@handler.add(MessageEvent, message=TextMessageContent)
def handle_message(event):
    with ApiClient(configuration) as api_client:
        app.logger.info(type(event))
        line_bot_api = MessagingApi(api_client)
        message: list = event.message.text.split()
        func_id: str = message[0]
        line_id: str = event.source.to_dict()['userId']
        status_code = 0
        site_user_id: str
        match func_id:

            #Register LINE bot with app's user ID
            case "id":
                site_user_id = message[1]
                if len(site_user_id) < 8:
                    send_msg(line_bot_api, event, DefaultMessage.default(DEF_MSG_TH["Err"]["InvalidId"]))
                    return 1
                status_code = um.add_user_id(USER_URL + "/addlineiduser", site_user_id, line_id)
                if status_code == 200:
                    send_msg(line_bot_api, event, DefaultMessage.default(DEF_MSG_TH["Confirmations"]["AddUserId"]))
                elif status_code == 406:
                    send_msg(line_bot_api, event, DefaultMessage.default(DEF_MSG_TH["Confirmations"]["AlreadyAdded"]))
                elif status_code == 404:
                    send_msg(line_bot_api, event, DefaultMessage.default(DEF_MSG_TH["UnregisteredUser"]))
                return 0
            
            #Set goal for calories and sleep
            case "set":
                site_user_id, status_code = um.get_user_id(URL, event.source.user_id)
                if status_code == 404:
                    send_msg(line_bot_api, event, DefaultMessage.default(DEF_MSG_TH["UnregisteredUser"]))
                    return 0
                Goal = GoalSet()
                goal_msg = ()
                goal: str = message[1]
                match goal:
                    case "cal":
                        calories: int = int(message[2])
                        if len(message) == 3:
                            goal_msg, status_code = Goal.calories_goal(site_user_id, calories)
                        else:
                            goal_msg, status_code = Goal.calories_goal(site_user_id, calories, int(message[3]))
                        if status_code > 400:
                            send_msg(line_bot_api, event, (DEF_MSG_TH["SetGoals"]["AlreadySet"]["Message"], []))
                        else: 
                            send_msg(line_bot_api, event, goal_msg)
                    case "sleep":
                        sleep_days: int = int(message[2])
                        if len(message) == 3:
                            goal_msg, status_code = Goal.sleep_goal(site_user_id, sleep_days)
                        else:
                            goal_msg, status_code = Goal.sleep_goal(site_user_id, sleep_days, int(message[3]))
                        if status_code > 400:
                            send_msg(line_bot_api, event, (DEF_MSG_TH["SetGoals"]["AlreadySet"]["Message"], []))
                        else: 
                            send_msg(line_bot_api, event, goal_msg)
                    case _:
                        send_msg(line_bot_api, event, DefaultMessage.default(DEF_MSG_TH["UnregisteredUser"]))
                pass
            case "view":
                data_type = message[1]
                data_arr: list[dict]
                status_code: int
                text = ""
                emojis = []
                match data_type:
                    case "cal":
                        if len(message) < 3:
                            data_arr, status_code = um.get_calories(URL, line_id)
                        else:
                            data_arr, status_code = um.get_calories(URL, line_id, int(message[2]))
                        if status_code == 404:
                            text, emojis = DefaultMessage.default(DEF_MSG_TH["UnregisteredUser"])
                        elif len(data_arr) > 0:
                            text, emojis = ResultMessage.calories_arr(data_arr)
                    case "sleep":
                        if len(message) < 3:
                            data_arr, status_code = um.get_sleep(URL, line_id)
                        else:
                            data_arr, status_code = um.get_sleep(URL, line_id, int(message[2]))
                        if status_code == 404:
                            text, emojis = DefaultMessage.default(DEF_MSG_TH["UnregisteredUser"])
                        elif len(data_arr) > 0:
                            text, emojis = ResultMessage.sleep_arr(data_arr)
                    case "score":
                        if len(message) < 3:
                            total_score, data_arr, status_code = um.get_score(URL, line_id)
                        else:
                            total_score, data_arr, status_code = um.get_score(URL, line_id, int(message[2]))
                        if status_code == 404:
                            text, emojis = DefaultMessage.default(DEF_MSG_TH["UnregisteredUser"])
                        elif len(data_arr) > 0:
                            text, emojis = send_msg(line_bot_api, event, ResultMessage.score_arr(total_score, data_arr))
                if status_code == 404:
                    send_msg(line_bot_api, event, (text, emojis))
                elif len(data_arr) == 0:
                    send_msg(line_bot_api, event, ("คุณยังไม่มีการส่งค่านั้นค่ะ\nส่งรูปหน้าจอสมาร์ทวอทช์เพื่อเริ่มบันทึกค่านะคะ", []))
                else: send_msg(line_bot_api, event, (text, emojis))

            case "tip":
                pass
            case "help":
                help_msgs = DEF_MSG_TH["Help"]
                if len(message) == 1:
                    send_msg(line_bot_api, event, HelpMessage.general_msg(help_msgs["General"], 
                                                                          help_msgs["ProductId"],
                                                                          help_msgs["Emoji"]))
                    send_msg(line_bot_api, event, (help_msgs["General"]["Tip"], []))
                    return 0
                func_name = message[1]
                match func_name:
                    case "set":
                        send_msg(line_bot_api, event, HelpMessage.general_msg(help_msgs["Set"], 
                                                                            help_msgs["ProductId"],
                                                                            help_msgs["Emoji"]))
                    case "view":
                        send_msg(line_bot_api, event, HelpMessage.general_msg(help_msgs["View"], 
                                                                            help_msgs["ProductId"],
                                                                            help_msgs["Emoji"]))
                    case _:
                        send_msg(line_bot_api, event, DefaultMessage.default(help_msgs["UnknownCommand"]))
            case _:
                send_msg(line_bot_api, event, DefaultMessage.default(DEF_MSG_TH["Err"]["UnknownCommand"]))

        return 0
                

@handler.add(MessageEvent, message=ImageMessageContent)
def handle_image(event):
    with ApiClient(configuration) as api_client:
        line_bot_api = MessagingApi(api_client)
        picture_id = ""
        try:
            picture_id = event.message.id
        except(KeyError):
            return 0

        #Check if user register with line
        try:
            user_id, status_code = um.get_user_id(URL, event.source.user_id)
        except:
            return 0
        if status_code == 404:
            send_msg(line_bot_api, event, DefaultMessage.default(DEF_MSG_TH["UnregisteredUser"]))
            return 0
        headers = {'Authorization': 'Bearer {' + f'{CHANNEL_ACCESS_TOKEN}' + '}'}
        binary = requests.get(f'https://api-data.line.me/v2/bot/message/{picture_id}/content', headers=headers)

        #Create Object holding image data and process
        picproc = PicProc(binary.content, f"{IMAGE_LOCATION}/{user_id}", date_format(), user_id)
        #Check if the image is the same as previous one
        if picproc.check_file_match(user_id):
            send_msg(line_bot_api, event, DefaultMessage.default(DEF_MSG_TH["Err"]["SamePicture"]))
            return 0
        
        #Image is being processed
        #send_msg(line_bot_api, event, DefaultMessage.default(MSG_TH["Confirmations"]["Uploaded"]))
        types, values = picproc.read_image()
        if len(types) == 0:
            send_msg(line_bot_api, event, DefaultMessage.default(DEF_MSG_TH["Err"]["ValueNotFound"]))
            return 1
        
        #Send result back to user
        cal_data: dict
        sleep_data: dict
        i = 0
        txt_msgs = []
        for t in types:
            match t:
                case 'cal':
                    cal_data, status_code = um.send_calories(URL, user_id, values[i])
                    match status_code:
                        case 200:
                            # send_msg(line_bot_api, event, ResultMessage.calories(cal_data, MSG_TH["PictureData"]))
                            text, emojis = ResultMessage.calories(cal_data)
                            app.logger.info(text)
                            app.logger.info(emojis)
                            txt_msgs.append(TextMessage(text=text, emojis=emojis))
                        case 403:
                            app.logger.info("Something wrong...")
                            pass
                        case 406:
                            text, emojis = DefaultMessage.default(DEF_MSG_TH["PictureData"]["Err"]["CaloriesSameOrLess"])
                            txt_msgs.append(TextMessage(text=text, emojis=emojis))
                case 'sleep':
                    sleep_data, status_code = um.send_sleep(URL, user_id, values[i])
                    match status_code:
                        case 200:
                            text, emojis = ResultMessage.sleep(sleep_data)
                            txt_msgs.append(TextMessage(text=text, emojis=emojis))
                        case 403:
                            app.logger.info("Something wrong...")
                            pass
                        case 406:
                            text, emojis = DefaultMessage.default(DEF_MSG_TH["PictureData"]["Err"]["SleepSent"])
                            txt_msgs.append(TextMessage(text=text, emojis=emojis))
            i += 1
            time.sleep(1)
        send_msg_obj(line_bot_api, event, txt_msgs) 
        #Save image for checking match image next time
        app.logger.info("saving picture...")
        picproc.save_image()

#Send message to user
def send_msg(api, event, msg_create):
    msg, emojis = msg_create
    app.logger.info(msg)
    app.logger.info(emojis)
    if len(emojis) == 0:
        api.reply_message_with_http_info(
            ReplyMessageRequest(
                reply_token=event.reply_token,
                messages=[TextMessage(text=msg)]
            )
        )
    else:
        api.reply_message_with_http_info(
            ReplyMessageRequest(
                reply_token=event.reply_token,
                messages=[TextMessage(text=msg, emojis=emojis)]
            )
        )

def send_msg_obj(api, event, txt_msg):
    api.reply_message_with_http_info(
        ReplyMessageRequest(
            reply_token=event.reply_token,
            messages=txt_msg
        )
    )


def emoji_create(index, prodId, emojiId):
    emoji = {}
    emoji["index"] = index
    emoji["productId"] = prodId
    emoji["emojiId"] = emojiId
    return emoji

if __name__ == "__main__":
    ngrok.connect(12777, authtoken_from_env=True)
    app.run(port=12777)