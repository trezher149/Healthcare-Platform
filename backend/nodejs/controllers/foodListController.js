const foodDataModel = require('../models/foodData')

async function getFoodList(calories, foodIds = []) {
  var foodList = await foodDataModel.find({
    caloriesGive: { $lte: calories}
  }).select({ favAmount: -1 })
  .sort({ caloriesGive: 1 }).exec().lean()

  for (var i = 0; i < foodIds.length; i++) {
    foodList.push(foodIds[i])
  }

  return foodList
}

async function getAllFoodList() {
  return await foodDataModel.find()
  .sort({favAmount: -1}).limit(20)
  .exec().lean()
}

async function addFood(food) {
  return foodDataModel.create({
    foodName: food.foodName,
    caloriesGive: food.calories
  })
}

module.exports = {getFoodList, getAllFoodList, addFood}