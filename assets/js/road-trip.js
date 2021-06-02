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

window.onload = function() {
  var filterCheckbox = document.getElementsByClassName("filter-option");

  var trailFilter = function() {

    //get attribute of checkbox
    var attribute = this.value;

    //find all stops with the above attribute
    var filteredStops = document.querySelectorAll('[data-'+attribute+']');


    var checkedArray = [];

    //adds the value of each checked filter to the checkedArray
    for(var a=0; a < filterCheckbox.length; a++) {
      if(filterCheckbox[a].checked) {
        checkedArray.push("data-"+filterCheckbox[a].value);
      }
    }

    //loops through each filtered stop
    for(var i=0; i < filteredStops.length; i++) {

      var filteredAttributes = [];

      //adds the attributes of filtered stop to an array
      for(var b = 0, n; n = filteredStops[i].attributes[b]; ++b) filteredAttributes.push(n.name);

      //compares the filteredAttributes(stops) to the checkedArray(checkboxes) to determine if they share any values
      var filteredArray = checkedArray.filter(value => filteredAttributes.includes(value));

      if (filteredArray.length !== 0) {
        filteredStops[i].style.display="block";
      } else {
        filteredStops[i].style.display="none";
      }
    }
  };

  //run trailFilter if a checkbox is clicked
  for(var i=0; i < filterCheckbox.length; i++) {
      filterCheckbox[i].addEventListener('click', trailFilter, false);
  }
}
