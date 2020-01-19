// index2.js
const { nextISSTimesForMyLocation } = require('./iss_promised');


nextISSTimesForMyLocation()
  .then((data) => {
    const timeInfo = JSON.parse(data).response;
    for (let time of timeInfo) {
      console.log('time.risetime: ', new Date(time.risetime * 1000) + ` for ${time.duration} seconds`);
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
