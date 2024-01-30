import cv2 as cv
import numpy as np
import os
import shutil

TEMP_FILE = "temp.jpg"

def rescale(img: np.ndarray, scale=0.75):
  width = int(img.shape[1], * scale)
  height = int(img.shape[0] * scale)

  dimension = (width, height)

  return cv.resize(img, dimension, interpolation=cv.INTER_AREA)

class PictureProcess:

  def __init__(self, img_binary, image_location, image_date):
    arr = np.asarray(bytearray(img_binary), dtype=np.uint8)
    img_greyed = cv.imdecode(arr, 0)
    img_resize = cv.resize(img_greyed, (0, 0), fx=0.4, fy=0.4)
    cv.imwrite(image_location + "/" + TEMP_FILE, img_resize, [cv.IMWRITE_JPEG_QUALITY, 30])
    self.image_location = image_location
    self.image_date = image_date
  
  def check_file_match(self, user_id: str) -> bool:
    IMAGE_AMOUNT = 28 
    is_match = False
    try:
      pictures = os.listdir(self.image_location)
      if len(pictures) == IMAGE_AMOUNT + 1:
        os.remove(pictures[0])
      pictures.remove(TEMP_FILE)
      for picture in pictures:
        image_temp = cv.imread(f"{self.image_location}/{TEMP_FILE}", 0)
        pic = cv.imread(f"{self.image_location}/{picture}", 0)
        is_match = (image_temp.shape == pic.shape) and not np.bitwise_xor(image_temp, pic).any()
        if is_match:
            break
    except(FileNotFoundError):
      os.mkdir("./pictures_byte/" + str(user_id))
    return is_match
  
  def read_image(self):
    #Functions
    pass
    
  def save_image(self):
    shutil.copy(f"{self.image_location}/{TEMP_FILE}", f"{self.image_location}/{self.image_date}.jpg")    
    os.remove(f"{self.image_location}/{TEMP_FILE}")
