# Original code by Yang-33 (https://github.com/line/line-bot-sdk-python/blob/master/examples/flask-echo/app.py#L51)
# Edit and modified by trezher149 (Thunyavat Thanakornsombat)


from flask import Flask, request, abort
from logging.config import dictConfig
import ngrok, os, time, requests
from dotenv import load_dotenv
from io import BytesIO
import usermodules as ump
import random as rand
from datetime import datetime
from picture_proc import PictureProcess as PicProc
from msg_create import MessageCreate

load_dotenv()

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
    ImageMessage,
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

MessageCreate = MessageCreate()

def date_format():
    today = datetime.now()
    date_str = f"{today.day}{today.month}{today.year}-{today.hour}{today.minute}"
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


@handler.add(MessageEvent, message=TextMessageContent)
def handle_message(event):
    with ApiClient(configuration) as api_client:
        line_bot_api = MessagingApi(api_client)
        if (event.message.text[0:2] == 'id'):
            site_user_id = event.message.text[2:]
            if len(site_user_id) < 8:
                send_msg(line_bot_api, event, MessageCreate.default("$ User Id ต้องมี 8 ตัวนะคะ" ,
                                                ["5ac21a18040ab15980c9b43e"],
                                                ["063"]))
                return 1
            status_code = ump.add_user_id(USER_URL + "/addlineiduser", site_user_id, event.source.to_dict()['userId'])
            if status_code == 200:
                send_msg(line_bot_api, event, MessageCreate.default("ผูกบัญชี line กับบัญชีเรียบร้อยแล้วค่า~"))
            elif status_code == 403:
                send_msg(line_bot_api, event, MessageCreate.default("คุณได้ผูก line กับบัญชีของคุณแล้วนะคะ"))
            elif status_code == 401:
                send_msg(line_bot_api, event, MessageCreate.default("$ คุณยังไม่ได้สร้างบัญชีกับเว็บไซต์ของเรานะคะ\n" +
                                                                "หลังจากสร้างบัญชีเสร็จ พิมพ์ id[id ผู้ใช้] โดยไม่มี \"[]\" ในไลน์นี้นะคะ",
                                                                ["5ac21a18040ab15980c9b43e"],
                                                                ["074"]))
            return 0
        send_msg(line_bot_api, event, MessageCreate.default("ขอโทษค่ะ หนูไม่รู้คำสั่งนี้นะคะ $$",
                                                            ["5ac22a8c031a6752fb806d66", "5ac21a18040ab15980c9b43e"],
                                                            ["035", "060"]))
                

@handler.add(MessageEvent, message=ImageMessageContent)
def handle_image(event):
    with ApiClient(configuration) as api_client:
        line_bot_api = MessagingApi(api_client)
        picture_id = ""
        user_id = ""
        try:
            picture_id = event.message.id
        except(KeyError):
            return

        user_id = ump.get_user_id(URL, event.source.user_id)
        if user_id == 400:
            send_msg(line_bot_api, event, MessageCreate.default("$ คุณยังไม่ได้ผูกบัญชีกับบัญชีไลน์นะคะ\n" +
                                                                "พิมพ์ id[id ผู้ใช้] โดยไม่มี \"[]\" ในไลน์นี้นะคะ",
                                                                ["5ac21a18040ab15980c9b43e"],
                                                                ["074"]))
            return 1
        headers = {'Authorization': 'Bearer {' + f'{CHANNEL_ACCESS_TOKEN}' + '}'}
        binary = requests.get(f'https://api-data.line.me/v2/bot/message/{picture_id}/content', headers=headers)

        picproc = PicProc(binary.content, f"{IMAGE_LOCATION}/{user_id}", date_format())
        if picproc.check_file_match(user_id):
            send_msg(line_bot_api, event, MessageCreate.default("$ ขอโทษค่ะ ลงรูปที่ซ้ำกันไม่ได้นะคะ $" ,
                                                ["5ac21a18040ab15980c9b43e", "5ac22a8c031a6752fb806d66"],
                                                ["063", "036"]))
            return 1
        types, values = picproc.read_image()
        if len(types) == 0:
            send_msg(line_bot_api, event, MessageCreate.default("$ ขอโทษค่ะ ไม่พบค่าในหน้าจอสมาร์ทวอทช์หรืออ่านค่าไม่ได้ >< $" ,
                                                ["5ac21a18040ab15980c9b43e", "5ac22a8c031a6752fb806d66"],
                                                ["063", "036"]))
            return 1
        msgs = []
        cal_data: dict
        sleep_data: dict
        i = 0
        for t in types:
            match t:
                case 'cal':
                    cal_data = ump.send_calories(URL, event.source.to_dict()['userId'], values[i])
                    app.logger.info(cal_data)
                    if cal_data != int:
                        send_msg(line_bot_api, event, MessageCreate.calories(cal_data))
                case 'sleep':
                    pass
            i += 1
        if cal_data == 400 or sleep_data == "400":
            app.logger.info(cal_data)
            send_msg(line_bot_api, event, MessageCreate.default("$ คุณยังไม่ได้สร้างบัญชีกับเว็บไซต์ของเรานะคะ\n" +
                                                                "หลังจากสร้างบัญชีเสร็จ พิมพ์ id[id ผู้ใช้] โดยไม่มี \"[]\" ในไลน์นี้นะคะ",
                                                                ["5ac21a18040ab15980c9b43e"],
                                                                ["074"]))
        else:
            picproc.save_image()

def send_msg(api, event, msg_create):
    msg, emojis = msg_create
    if len(emojis) == 0:
        api.reply_message_with_http_info(
            ReplyMessageRequest(
                reply_token=event.reply_token,
                messages=[TextMessage(text=msg)]
            )
        )
    else:
        app.logger.info(msg)
        app.logger.info(emojis)
        api.reply_message_with_http_info(
            ReplyMessageRequest(
                reply_token=event.reply_token,
                messages=[TextMessage(text=msg, emojis=emojis)]
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
