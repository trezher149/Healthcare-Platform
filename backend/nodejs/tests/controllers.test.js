const mongoose = require('mongoose')
mongoose.connection.setMaxListeners(20)
const {createUser, loginUser} = require('../controllers/user/userController')
const {updateCalories, getCaloriesSeriesData} = require("../controllers/seriesData/caloriesController")
const {updateSleep} = require("../controllers/seriesData/sleepController")
const {setCaloriesGoal, createUserCaloriesData} = require("../controllers/staticData/caloriesController")
const createScoreTable = require("../controllers/staticData/scoreController")
const {createUserSleepData, setSleepGoal} = require("../controllers/staticData/sleepController")

const sleepSeriesData = require("../models/sleepSeriesData")
const sleepData = require("../models/sleepData")

beforeAll(async () => {
  await mongoose.connect(globalThis.__MONGO_URI__)
})

afterAll(async () => {
  await mongoose.connection.close()
})

var testUserId
const healthData = {
  sex: 0,
  height: 180,
  weight: 75,
  age: 28
}

describe("Testing user modules", () => {
  const email = "test@test.com"
  const name = "test"
  const password = "123"

  test("Creating user", () => {
    return createUser(email, name, password, healthData)
    .then((userId) => {
      testUserId = userId
      expect(userId).toBeTruthy()
    })
  })

  test("User authentication", () => {
    return loginUser(name, password)
    .then((loggedInUserId) => {
      expect(loggedInUserId).toBe(testUserId)
    })
  })

  test("Connection amount must be less than 5", () => {
    expect(mongoose.connections.length).toBeLessThan(5)
  })

})

describe("Initializing modules", () => {

  test("Creating score data", () => {
    return createScoreTable(testUserId)
    .then((userId) => {expect(userId).toBe(testUserId)})
  })

  test("Creating calories data", () => {
    return createUserCaloriesData(testUserId, healthData)
    .then((resCode) => {expect(resCode).toBe(200)})
  })

  test("Creating sleep data", () => {
    return createUserSleepData(testUserId)
    .then((userId) => {expect(userId).toBe(testUserId)})
  })

})

describe("Testing calories controllers", () => {
  const mockCalories = 100

  test("User send a new calories", () => {
    return updateCalories(testUserId, mockCalories)
    .then((result) => {
      expect(result.score).toBeGreaterThan(0)
    })
  })

  test("User check a calories history on the same day", () => {
    return updateCalories(testUserId, mockCalories * 2)
    .then(() => {return getCaloriesSeriesData(testUserId)})
    .then((resultArr) => {
      expect(resultArr.length).toBe(1) 
    })
  })

  test("User set their new calories goal", () => {
    return setCaloriesGoal(testUserId, 2000)
    .then((result) => {expect(result).toBeTruthy()})
  })

  test("User send a new calories with a goal set. \
Goal 'isActive' status will be true", () => {
    return updateCalories(testUserId, mockCalories * 3)
    .then((result) => {expect(result.isActive).toBe(true)})
  })

  test("User goal completed.\
'isAchived' will be true and 'isActive' is fault", () => {
    return updateCalories(testUserId, mockCalories * 30)
    .then((result) => {
      expect(result.isAchived && !result.isActive).toBe(true)
    })
  })

  test("User set a new Goal", () => {
    return setCaloriesGoal(testUserId, 2000)
    .then((result) => {expect(result).toBeTruthy()})
  })

  test("The latest goal is not expired yet, but user set it anyway. \
Sending 406 status code", () => {
    return setCaloriesGoal(testUserId, 2000)
    .catch((statusCode) => {expect(statusCode).toBe(406)})
  })

})

describe("Testing sleep controllers", () => {
  const mockSleepTime = 456
  const mockLackSleepTime =345

  afterEach(async() => {
    const id = await sleepData.find({userId: testUserId}).select({_id: 1}).lean()
    await sleepSeriesData.deleteMany({tableRef: id})
  })

  test("User sleep more (no less) than 7 hours", () => {
    return updateSleep(testUserId, mockSleepTime)
    .then((result) => {expect(result.sleepCond).toBe(true)})
  })

  test("User sleep less than 7 hours", () => {
    return updateSleep(testUserId, mockLackSleepTime)
    .then((result) => {expect(result.sleepCond).toBe(false)})
  })

  test("User set sleep goal", () => {
    return setSleepGoal(testUserId, 7)
    .then((result) => {expect(result).toBeTruthy()})
  })

  test("Sleep no less than 7 hours. Increment streak", () => {
    return updateSleep(testUserId, mockSleepTime)
    .then((result) => {expect(result.streakTotal).toBe(1)})
  })

  test("Sleep less than 7 hours. Reset streak", () => {
    return updateSleep(testUserId, mockLackSleepTime)
    .then((result) => {expect(result.streakTotal).toBe(0)})
  })

  test("The latest goal is not expired yet, but user set it anyway. \
Sending 406 status code", () => {
    return setSleepGoal(testUserId, 7)
    .catch((statusCode) => {expect(statusCode).toBe(406)})
  })
})
