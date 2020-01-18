// index.js
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (let time of passTimes) {
    console.log('time.risetime: ', new Date(time.risetime * 1000) + ` for ${time.duration} seconds`);
  }
});