// index2.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');
fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => {
    //console.log(body);
    const timeInfo = JSON.parse(body).response;
    for (let time of timeInfo) {
      console.log('time.risetime: ', new Date(time.risetime * 1000) + ` for ${time.duration} seconds`);
    }
  });

// nextISSTimesForMyLocation()
//   .then(fetchMyIP)
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(bodybody => {
//     //console.log(body);
//     const timeInfo = JSON.parse(body).response;
//     for (let time of timeInfo) {
//       console.log('time.risetime: ', new Date(time.risetime * 1000) + ` for ${time.duration} seconds`);
//     }
//   });