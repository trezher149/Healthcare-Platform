import cv2 as cv
import numpy as np
import os
import shutil
import random as rand
from ultralytics import YOLO
import easyocr
import ast

TEMP_FILE = "temp.jpg"

model = YOLO("modules/modelv4.onnx", task="detect")
reader = easyocr.Reader(['en'], gpu=False)

def value_check(s: str) -> str:
  match s:
    case "S":
      return  "5"
    case "A":
      return "4"
    case "l":
      return "1"
    case "I":
      return "1"
    case _:
      return s


def image_crop(height, width, picture):
  crop_percent_h = 0
  crop_percent_w = 0
  if height // width == 1:
    crop_percent_h = int(picture.shape[0] * 0.23)
    crop_percent_w = int(picture.shape[1] * 0.23)
  else:
    crop_percent_h = int(picture.shape[0] * 0.22)
    crop_percent_w = int(picture.shape[1] * 0.32)
  crop_end_h = picture.shape[0] - crop_percent_h
  crop_end_w = picture.shape[1] - crop_percent_w
  return picture[crop_percent_h: crop_end_h, crop_percent_w: crop_end_w]

class PictureProcess:

  def __init__(self, img_binary, image_location, image_date, user_id):
    arr = np.asarray(bytearray(img_binary), dtype=np.uint8)
    img_greyed = cv.imdecode(arr, 0)

    img_h = img_greyed.shape[0]
    img_w = img_greyed.shape[1]

    if img_h // img_w == 1:
      img_resize = cv.resize(img_greyed, (0, 0), fx=0.8, fy=0.8, interpolation=cv.INTER_LINEAR)
    else:
      img_resize = cv.resize(img_greyed, (0, 0), fx=0.9, fy=0.9, interpolation=cv.INTER_LINEAR)
    img_h = img_resize.shape[0]
    img_w = img_resize.shape[1]

    img_crop = image_crop(img_h, img_w, img_resize)
    
    brightness = 0.8
    self.img_dark = cv.convertScaleAbs(img_crop, alpha=brightness, beta=0)
    #cv.imwrite(image_location + "/" + TEMP_FILE, self.img_dark)
    self.image_location = image_location
    self.image_date = image_date
    self.user_id = user_id
  
  def check_file_match(self, user_id: str) -> bool:
    IMAGE_AMOUNT = 42 
    is_match = False
    try:
      pictures = os.listdir(self.image_location)
      if len(pictures) >= IMAGE_AMOUNT + 1:
        os.remove(f"{self.image_location}/{pictures[0]}")
        pictures = os.listdir(self.image_location)
      #pictures.remove(TEMP_FILE)
      #image_temp = cv.imread(f"{self.image_location}/{TEMP_FILE}", 0)
      cv.imwrite(self.image_location + "/" + TEMP_FILE, self.img_dark)
      image_temp = cv.imread(f"{self.image_location}/{TEMP_FILE}", 0)
      for picture in pictures:
        pic = cv.imread(f"{self.image_location}/{picture}", 0)
        is_match = (image_temp.shape == pic.shape) and not np.bitwise_xor(image_temp, pic).any()
        if is_match:
          break
      os.remove(f"{self.image_location}/{TEMP_FILE}")
    except(FileNotFoundError):
      os.mkdir("./pictures_byte/" + user_id)
    return is_match
  
  def read_image(self):
    val_type = []
    val_read: list[int] = []
    cv.imwrite(self.image_location + "/" + TEMP_FILE, self.img_dark)
    image_temp = cv.imread(f"{self.image_location}/{TEMP_FILE}")
    results = model.predict(image_temp, imgsz=320, conf=0.7)
    for result in results:
      res_json = ast.literal_eval(result.tojson())
      for attrib in res_json:
        bounding_box = attrib["box"]
        value_box = image_temp[int(bounding_box["y1"]): int(bounding_box["y2"]),
                             int(bounding_box["x1"]): int(bounding_box["x2"])]
        result_str = reader.readtext(value_box,detail=0, low_text=0.49,
                                     slope_ths=0.3, text_threshold=0.8,
                                     canvas_size=452, contrast_ths=0.2,
                                     mag_ratio=1.2, blocklist="'-.,()\{\} ",
                                     width_ths=0.25)
        if attrib["name"] == "cal":
          to_read_str = ""
          cal_str = ""
          char_detect = 0
          if len(result_str) > 1:
            if result_str[0][0] == '0' or not result_str[0][0].isnumeric():
              to_read_str = result_str[1]
            else: to_read_str = result_str[0]
          elif len(result_str) == 1: to_read_str = result_str[0]
          for value in to_read_str.split("/")[0]:
            if char_detect > 2:
              break
            value = value_check(value)
            if not value.isnumeric():
              char_detect += 1
              continue
            cal_str += value
          if len(cal_str) > 0:
            val_type.append(attrib["name"])
            val_read.append(int(cal_str))

        elif attrib["name"] == "sleep":
          arr_index = 0
          if len(result_str) > 1:
            arr_index = len(result_str) // 2
          hour_str = ""
          minute_str = ""
          number_found = False
          start_index = 0
          offset = 0
          
          # Hours
          for res in result_str[arr_index:]:
            for character in result_str[arr_index][0:]:
              character = value_check(character)
              if character.isnumeric() and len(hour_str) < 2:
                hour_str += character
                number_found = True
                start_index += 1
                continue
              elif number_found:
                break
            if len(hour_str) == 0:
              offset += 1
              start_index = 0
              continue
          if int(hour_str) > 16:
            hour_str = hour_str[0]
          
          arr_index += offset
          
          # Minutes
          number_found = False
          k = 0
          for res in result_str[arr_index:]:
            for character in res[start_index:]:
              character = value_check(character)
              if character == " ":
                minute_str = ""
                continue
              if character.isnumeric():
                minute_str += character
                number_found = True
                continue
              elif number_found:
                break
            if arr_index + k + 1 < len(result_str):
              minute_str = ""
              start_index = 0
              k += 1
              continue
            if len(minute_str) > 0:
              break
            minute_str = ""
            start_index = 0
          if len(minute_str) == 0:
            continue
          if int(minute_str) > 59:
            if len(minute_str) > 3:
              if len(hour_str) == 0:
                hour_str += value_check(minute_str[0])
              minute_str += value_check(minute_str[1:])
            else:
              minute_str = minute_str[:2]
            
          val_type.append(attrib["name"])
          val_read.append(int(hour_str) * 60 + int(minute_str))
    #return type, value
    os.remove(f"{self.image_location}/{TEMP_FILE}")
    return val_type, val_read
    
  def save_image(self):
    cv.imwrite(f"{self.image_location}/{self.user_id}-{self.image_date}.jpg", self.img_dark)
    #shutil.copy(f"{self.image_location}/{TEMP_FILE}", f"{self.image_location}/{self.user_id}-{self.image_date}.jpg")    
    #os.remove(f"{self.image_location}/{TEMP_FILE}")
