const foodDataModel = require('../models/foodData')
const {getUserData} = require('./user/userController')

async function getFoodList(calories, userId) {
  var userFood = await getUserData(userId)
  .then((data) => {return data[1].favFoodId})
  const foodList = await foodDataModel.find({caloriesGive: { $lte: calories}}).limit(6 - userFood.length)
  .sort({ caloriesGive: -1 }).select({ foodName: 1, caloriesGive: 1 }).exec()
  
  return userFood.concat(foodList)
}

async function getAllFoodList() {
  return await foodDataModel.find()
  .sort({favAmount: -1}).limit(20)
  .exec().lean()
}

async function addFood(foodName, caloriesGive) {
  return foodDataModel.create({
    foodName: foodName,
    caloriesGive: caloriesGive
  })
}

module.exports = {getFoodList, getAllFoodList, addFood}