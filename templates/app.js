
//hbs-->handlebars which are template engines

var inputSearch = document.querySelector("#generating_text_id").value;

var content = document.querySelector("#gen_output");

var btn = document.querySelector("#button_id");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (event)=>{

    const transcript = event.results[0][0].transcript;

    content.textContent = transcript;

    speakThis(transcript.toLowerCase());
}

recognition.onerror = (event)=>{
    console.log("error occurred", event.error);
}

btn.addEventListener('click',()=>{
    recognition.start();
})

function speak(sentence){
    const text_speak = new SpeechSynthesisUtterance(sentence);

    text_speak.rate = 1;

    text_speak.volume = 2;

    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function speakThis(message){

    const speech = new SpeechSynthesisUtterance();

    speech.text = "can not generate the weather information about that location";
    
    if(message.includes('hello')){
        const finalText = "Hello boss good morning!";

        speech.text = finalText;

        speech.volume = 2;

        speech.pitch = 1;

        speech.rate = 1;

        window.speechSynthesis.speak(speech);
    }

    else if(message.includes(`show me ${inputSearch}`)){

        const location_name = `${message.split(' ').pop()}`;

        location_name.replace(/\.$/, '');


        //console.log(location_name);

        var str = location_name;

        str.replace(/^[\s.]+|[\s.]+$/g,"");

        if (str.endsWith(".")) {
            str = str.slice(0, -1);
          }
        //console.log(str);

        const finalText = `Getting details about ${location_name}`;

        document.getElementById("generating_text_id").innerHTML = inputSearch;

        async function getWeather()
        {

            var api_url_1 = `https://geocoding-api.open-meteo.com/v1/search?name=${str}&count=1&language=en&format=json`;

            //console.log(api_url_1);
            
            var response_1 = await fetch(api_url_1);

            var json_data_1 = await response_1.json();

            //console.log(json_data_1);

            //console.log(json_data_1.results[0]);

            var results = json_data_1.results[0];

            var {latitude,longitude,admin1,country,population,timezone} = results;

            console.log(latitude);

            console.log(longitude);

            console.log(admin1);

            console.log(country);

            console.log(population);

            console.log(timezone);

            document.querySelector("#location_id").textContent = str;

            document.querySelector("#latitude_id").textContent = latitude;

            document.querySelector("#longitude_id").textContent = longitude;

            document.querySelector("#state_id").textContent = admin1;

            document.querySelector("#country_id").textContent = country;

            document.querySelector("#population_id").textContent = population;

            document.querySelector("#timezone_id").textContent = timezone;

            var api_url_2 = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,snowfall_sum,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,et0_fao_evapotranspiration&timezone=Asia%2FSingapore&past_days=3`;

            var response_2 = await fetch(api_url_2);

            var json_data_2 = await response_2.json();

            console.log(json_data_2);

            var output_2 = json_data_2.daily;

            var {et0_fao_evapotranspiration,precipitation_sum,rain_sum,snowfall_sum,sunrise
,sunset,temperature_2m_min,time,uv_index_max,winddirection_10m_dominant,windgusts_10m_max,windspeed_10m_max} = output_2;

            console.log(output_2);

            document.querySelector("#evapotranspiration_id").textContent = et0_fao_evapotranspiration;

            document.querySelector("#precipitation_sum_id").textContent = precipitation_sum;

            document.querySelector("#rain_sum_id").textContent = rain_sum;

            document.querySelector("#snow_sum_id").textContent = snowfall_sum;

            document.querySelector("#sunrise_id").textContent = sunrise;

            document.querySelector("#sunset_id").textContent = sunset;

            document.querySelector("#temperature_id").textContent = temperature_2m_min;

            document.querySelector("#time_id").textContent = time;

            document.querySelector("#uv_index_id").textContent = uv_index_max;

            document.querySelector("#wind_dir_id").textContent = winddirection_10m_dominant;

            document.querySelector("#wind_gusts_id").textContent = windgusts_10m_max;

            document.querySelector("#wind_speed_id").textContent = windspeed_10m_max;

            console.log(latitude);
            console.log(longitude);

            var map = L.map('map').setView([51.505, -0.09], 13);
            var marker;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);


            function geocodeLocation() 
            {
                  var location = str;
                  var marker;
                  // Make a request to the Nominatim Geocoding API
                  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
                  .then(response => response.json())
                  .then(data => {
                  if (data.length > 0) 
                  {
                        var latitude = parseFloat(data[0].lat);
                        var longitude = parseFloat(data[0].lon);

                        // Remove existing marker (if any)
                        if (marker) 
                        {
                            map.removeLayer(marker);
                        }

                        // Create a marker at the geocoded location
                        marker = L.marker([latitude, longitude]).addTo(map);
                        map.setView([latitude, longitude], 13);
                  } 
                  else 
                  {
                        alert('Location not found.');
                  }
                })
                .catch(error => {
                    console.error('Geocoding error:', error);
                });
            }

            geocodeLocation();

        } 


        getWeather();

        console.log("Outside the function for location name"+str);


        speech.text = finalText;

        speech.volume = 5;

        speech.pitch = 1;

        speech.rate = 1;

        window.speechSynthesis.speak(speech);

    }
    
}


