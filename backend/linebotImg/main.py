# Original code by Yang-33 (https://github.com/line/line-bot-sdk-python/blob/master/examples/flask-echo/app.py#L51)
# Edit and modified by trezher149 (Thunyavat Thanakornsombat)


from flask import Flask, request, abort
from logging.config import dictConfig
import ngrok, os, time, requests, io, base64
from dotenv import load_dotenv
import PIL.Image as Image

load_dotenv()

CHANNEL_ACCESS_TOKEN = os.environ.get("CHANNEL_ACCESS_TOKEN")
CHANNEL_SECRET = os.environ.get("CHANNEL_SECRET")

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
    ImageMessageContent
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
        line_bot_api.reply_message_with_http_info(
            ReplyMessageRequest(
                reply_token=event.reply_token,
                messages=[TextMessage(text=event.message.text)]
            )
        )

@handler.add(MessageEvent, message=ImageMessageContent)
def handle_image(event):
    with ApiClient(configuration) as api_client:
        line_bot_api = MessagingApi(api_client)
        picture_id = event.message.id
        headers = {'Authorization': 'Bearer {' + f'{CHANNEL_ACCESS_TOKEN}' + '}'}
        binary = requests.get(f'https://api-data.line.me/v2/bot/message/{picture_id}/content', headers=headers)
        line_bot_api.reply_message_with_http_info(
            ReplyMessageRequest(
                reply_token=event.reply_token,
                messages=[TextMessage(text="Picture Send!")]
            )
        )
        img = Image.open(io.BytesIO(binary.content))
        img.save(f"./pictures/{picture_id}.jpg")

if __name__ == "__main__":
    ngrok.connect(12777, authtoken_from_env=True)
    app.run(port=12777)
