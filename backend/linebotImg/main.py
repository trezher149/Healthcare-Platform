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
        if (event.message.text[0] == 'i'):
            # if ump.add_user_id(USER_URL + "/addlineiduser", event.source.to_dict()['userId'], event.message.text[1:]):
            if ump.add_user_id(USER_URL + "/addlineiduser", event.source.to_dict()['userId'], '375d99cbcf2a'):
                send_msg(line_bot_api, event, "ผูกบัญชี line กับบัญชีเรียบร้อยแล้วค่า~")
            else:
                send_msg(line_bot_api, event, "คุณได้ผูก line กับบัญชีของคุณแล้วนะคะ")
            return
        app.logger.info(event.source.to_dict()['userId'])
        send_msg(line_bot_api, event, "หนูไม่รู้คำสั่งนี้นะคะ")
                

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
            send_msg(line_bot_api, event, "คุณยังไม่ได้ผูกบัญชีกับบัญชี line ของคุณนะคะ")
            return
        headers = {'Authorization': 'Bearer {' + f'{CHANNEL_ACCESS_TOKEN}' + '}'}
        binary = requests.get(f'https://api-data.line.me/v2/bot/message/{picture_id}/content', headers=headers)
        picproc = PicProc(binary.content, f"{IMAGE_LOCATION}/{user_id}", date_format())
        if picproc.check_file_match(user_id):
            send_msg(line_bot_api, event, "ขอโทษค่า ลงรูปที่ซ้ำกันไม่ได้นะคะ")
            return 0
        picproc.read_image()
        status = ump.send_calories(URL, event.source.to_dict()['userId'], rand.randint(100, 500))
        if status == "400":
            send_msg(line_bot_api, event, "คุณยังไม่ได้ผูกบัญชีกับบัญชี line ของคุณนะคะ")
        else:
            send_msg(line_bot_api, event, f"คุณได้ {str(status)} คะแนนค่า")
            picproc.save_image()

def send_msg(api, event, msg, emojis = []):
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



if __name__ == "__main__":
    ngrok.connect(12777, authtoken_from_env=True)
    app.run(port=12777)
