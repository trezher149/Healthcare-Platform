const userHealthDataModel = require('../../models/userHealthData')
const caloriesDataModel = require('../../models/caloriesData')

function HarrisBenedict(usrSex, weight, height, age) {
  // Female
  if (usrSex) {
    return 655.0955 + (9.5634 * weight) + (1.8496 * height) - (4.6756 * age)
  }
  // Male
  else {
    return 66.4730 + (13.7516 * usrHealth.weight )+ (5.0033 * usrHealth.height) - (6.7550 * usrHealth.age)
  }
}

function setOptions(options, usrTableData) {
  if ('setCaloriesGoal' in options) {
    usrTableData.caloriesGoal = options.setCaloriesGoal
    usrTableData.goalSetTime = Date.now()
  }
}

function createUserCaloriesData(userId, usrHealth, optionsData = {}) {
  //  First time user using the app
  // The bmr is the minimum
  // Using Harris-Benedict equation with average IC value in mind
  const bmr = Math.round(
    HarrisBenedict(usrHealth.sex, usrHealth.weight, usrHealth.height, usrHealth.age)
  ) - 329
  var caloriesData = new caloriesDataModel({
    userId: userId,
    bmr: bmr,
  })
  if (Object.keys(optionsData).length > 0) {
    setOptions(options,caloriesData)
    caloriesData.caloriesGoal = otherData.setCaloriesGoal
  }
  return caloriesData
}

async function getUserCaloriesData(userId) {
  caloriesDataModel.findOne({userId:userId})
  .then((caloriesData) => {
    return {
      'caloriesTotal': caloriesData.caloriesTotal,
      'bmr': caloriesData.bmr,
      'caloriesGoal': caloriesData.caloriesGoal,
      'streakGoal': caloriesData.streak,
      'hasAchivedTime': caloriesData.hasAchivedTime
    }
  })
}

async function setCaloriesGoal(userId, caloriesGoal){
  var caloriesData = caloriesDataModel.findById(userId)
  if (caloriesData != null) {
    if (caloriesData.goalSetTime.getDate() - Date.now().getDate() > caloriesData.goalSetIntervalDay){
      caloriesData.caloriesGoal = caloriesGoal
      caloriesData.hasAchivedTime = 0
      caloriesData.save().then(() => { return "Setting complete!" })
    }
    return Promise.reject("Already set!")
  }
  else {
    const usrHealth = await userHealthDataModel.findOne({userId: userId})
    caloriesData = createUserCaloriesData(userId, usrHealth, {setCaloriesGoal: caloriesData})
    caloriesData.save().then(() => { return "Creating and setting complete!" }) 
  }
}

module.exports = {getUserCaloriesData, setCaloriesGoal}