const request = require('request');


const fetchMyIP = function (callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};


const fetchISSFlyOverTimes = function (coords, callback) {
  let URL = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`
  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null)
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    let passes = JSON.parse(body).response
    callback(null, passes)



  })
};
const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    console.log('It worked! Returned IP:', ip);
    fetchCoordsByIP('38.15.112.62', (error, coordinates) => {
      if (error) {
        callback(error, null);
        return;
      }

      console.log('It worked! Returned coordinates:', coordinates);
      let coords = { latitude: 45.4995, longitude: -73.5848 }
      fetchISSFlyOverTimes(coords, (error, passes) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, passes);


      })
    });
  });

}



module.exports = { nextISSTimesForMyLocation };
