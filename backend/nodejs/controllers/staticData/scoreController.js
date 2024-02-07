const scoreDataModel = require('../../models/scoreData')

async function createScoreTable(userId) {
  const scoreData = new scoreDataModel({userId: userId})
  return scoreData.save().then(() => {return userId})
}

module.exports = createScoreTable