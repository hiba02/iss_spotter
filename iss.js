const fetchMyIP = function(callback) {
  const request = require('request');
  let url = "https://api.ipify.org?format=json";
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ipObject = JSON.parse(body);
    const ip = ipObject.ip;
    callback(error, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const request = require('request');
  const url = `https://ipvigilante.com/${ip}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const locationObj = JSON.parse(body);
    const latitude = locationObj.data.latitude;
    const longitude = locationObj.data.longitude;
    const location = {};
    location.latitude = latitude;
    location.longitude = longitude;
    callback(error, location);
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  const request = require('request');
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null, null);
      return;
    }
    const locationObj = JSON.parse(body).response;
    callback(error, locationObj);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return fetchMyIP(error, null);
    }
    // console.log('It worked! Returned IP from fetchMyIP function:', ip);
    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        console.log("It didn't work!" , error);
        return fetchCoordsByIP(error, null);
      }
      // console.log("From fetchCoordsByIP - location: ", location);
      fetchISSFlyOverTimes(location, (error, array) => {
        if (error) {
          console.log("It didn't work!" , error);
          return fetchISSFlyOverTimes(error, null);
        }
        // console.log("From fetchISSFlyOverTimes - It worked!\n",array);
        callback(error, array);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };