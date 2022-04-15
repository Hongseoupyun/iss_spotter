//const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (let time of passTimes){
    const date = new Date(time.risetime * 1000) 
    console.log("Next passes at " + date + "for " + time.duration);
  
  

  }
  
 
});

/*fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('38.15.112.62', (error, coordinates) => {
  if (error) {
    console.log("Error!" , error);
    return;
  }

  console.log('It worked! Returned coordinates:' , coordinates);
});

let coords = { latitude: 45.4995, longitude: -73.5848 }
fetchISSFlyOverTimes(coords,(error,passes)=>{
  if(error){
    console.log('Error!:',error)
    return;
  }
  console.log("It is working! flyover time:", passes)


})
*/



