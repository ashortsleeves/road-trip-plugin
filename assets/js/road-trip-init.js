// JavaScript to be fired on the about us page
function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 44.85, lng: -70.65 },
  });
  directionsRenderer.setMap(map);
  document.getElementById("submit").addEventListener("click", () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const waypts = [];
  const checkboxArray = document.getElementById("waypoints");

  for (let i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected) {
      waypts.push({
        location: checkboxArray[i].value,
        stopover: true,
      });
    }

  }
  directionsService.route(
    {
      origin: document.getElementById("start").value,
      destination: document.getElementById("end").value,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    },

    (response, status) => {
      if (status === "OK" && response) {

        console.log(response);

        console.log(response.routes[0].waypoint_order);
        console.log(response.routes[0].waypoint_order[response.routes[0].waypoint_order.length - 1]);
        console.log(response.routes[0].legs[response.routes[0].legs.length - 1]);

        directionsRenderer.setDirections(response);




      //   const route = response.routes[0];
      //   const summaryPanel = document.getElementById("directions-panel");
      //   summaryPanel.innerHTML = "";
      //
      //   // For each route, display summary information.
      //   for (let i = 0; i < route.legs.length; i++) {
      //     const routeSegment = i + 1;
      //     summaryPanel.innerHTML +=
      //       "<b>Route Segment: " + routeSegment + "</b><br>";
      //     summaryPanel.innerHTML += route.legs[i].start_address + " to ";
      //     summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
      //     summaryPanel.innerHTML +=
      //       route.legs[i].distance.text + "<br><br>";
      //   }
      // } else {
      //   window.alert("Directions request failed due to " + status);
      }
    }
  );

}


//For each data-filter="..." If a box is checked, any destinations with that value should be greenlit.
//a destination must be greenlit for every data-filter to be displayed
//if a data-filter has no selected checkboxes, all destinations are greenlit for that datafilter
