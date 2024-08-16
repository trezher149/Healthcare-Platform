const scoreDataModel = require('../../models/scoreData')

async function createScoreTable(userId) {
  const SCORE_DATA = new scoreDataModel({userId: userId})
  await SCORE_DATA.save()
  return userId
}

module.exports = createScoreTable