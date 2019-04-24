window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDesc = document.querySelector(".temperature-description");
  let temperatureDeg = document.querySelector(".temperature-degrees");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}https://api.darksky.net/forecast/af460b9be761f42a2f3f3f914bcf0543/${lat},${long}`;
      console.log(api);
      fetch(api)
        .then(response => {
          return response.json();
        })

        .then(data => {
          const { temperature, summary, icon } = data.currently;

          //Set DOM elements

          temperatureDeg.textContent = temperature;
          temperatureDesc.textContent = summary;
          locationTimezone.textContent = data.timezone;

          //FORMULA for C
          let celcius = (temperature - 32) * (5 / 9);

          setIcons(icon, document.querySelector(".icon"));
          setIcons(icon, document.querySelector(".backgroundIcon"));

          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDeg.textContent = Math.floor(celcius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDeg.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();

    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
