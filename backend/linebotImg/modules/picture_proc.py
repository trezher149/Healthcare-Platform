import cv2 as cv
import numpy as np
import os
import shutil
import random as rand

TEMP_FILE = "temp.jpg"

def image_crop(height, width, picture):
  crop_percent_h = 0
  crop_percent_w = 0
  if height // width == 1:
    crop_percent_h = int(picture.shape[0] * 0.23)
    crop_percent_w = int(picture.shape[1] * 0.23)
  else:
    crop_percent_h = int(picture.shape[0] * 0.22)
    crop_percent_w = int(picture.shape[1] * 0.42)
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
      img_resize = cv.resize(img_greyed, (0, 0), fx=0.56, fy=0.56, interpolation=cv.INTER_LINEAR)
    else:
      img_resize = cv.resize(img_greyed, (0, 0), fx=0.8, fy=0.8, interpolation=cv.INTER_LINEAR)
    img_h = img_resize.shape[0]
    img_w = img_resize.shape[1]

    img_crop = image_crop(img_h, img_w, img_resize)
    
    brightness = 0.8
    img_dark = cv.convertScaleAbs(img_crop, alpha=brightness, beta=0)
    cv.imwrite(image_location + "/" + TEMP_FILE, img_dark)
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
      pictures.remove(TEMP_FILE)
      image_temp = cv.imread(f"{self.image_location}/{TEMP_FILE}", 0)
      for picture in pictures:
        pic = cv.imread(f"{self.image_location}/{picture}", 0)
        is_match = (image_temp.shape == pic.shape) and not np.bitwise_xor(image_temp, pic).any()
        if is_match:
          os.remove(f"{self.image_location}/{TEMP_FILE}")
          break
    except(FileNotFoundError):
      os.mkdir("./pictures_byte/" + user_id)
    return is_match
  
  def read_image(self):
    #Functions
    #return type, value
    return ['cal'], [rand.randint(100, 500)]
    
  def save_image(self):
    shutil.copy(f"{self.image_location}/{TEMP_FILE}", f"{self.image_location}/{self.user_id}-{self.image_date}.jpg")    
    os.remove(f"{self.image_location}/{TEMP_FILE}")
