window.onload = getGeoLocation;

document.getElementById("degname").addEventListener("click",(e) => {

    let name = e.target.innerHTML;
    if(name == 'C')
   {
     let calculation = Math.round(((parseInt(document.getElementById("temperature").innerHTML) * 9)/5) + 32) + "&deg;";
     
      document.getElementById("temperature").innerHTML = calculation;
       document.getElementById("degname").innerHTML = 'F';
   }
   else
   {
      let calculation = Math.round(((parseInt(document.getElementById("temperature").innerHTML) - 32)*5)/9) + "&deg;";
      document.getElementById("temperature").innerHTML = calculation;
      document.getElementById("degname").innerHTML = 'C';
   }

   });


function performCallback(returnedJSON)
{
   let jsonResponse = returnedJSON;
   let country = returnedJSON.sys.country, cityName = returnedJSON.name , temp = returnedJSON.main.temp, weatherCondition = returnedJSON.weather[0].main, icon = returnedJSON.weather[0].icon;
    document.getElementById("namePlace").innerHTML = cityName + ", " + country;
    document.getElementById("temperature").innerHTML = temp + "&deg;";
    document.getElementById("weathercond").innerHTML = weatherCondition;
   
    let getImageelement = document.getElementById("imageicon");
    getImageelement.src = icon;
    getImageelement.style.width = '100%';
    getImageelement.style.height= 'auto';
  }


function getGeoLocation()
{
    if (navigator.geolocation) {
        //navigator.geolocation.getCurrentPosition(showPosition);
        navigator.geolocation.getCurrentPosition((position) => {
            
                let lat = position.coords.latitude;
                let longi = position.coords.longitude;
                
                getWeather(lat,longi);
            });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function getWeather(lat,longi){
  let urlStr = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + longi;
  fetch(urlStr)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    performCallback(myJson);
  });
}

