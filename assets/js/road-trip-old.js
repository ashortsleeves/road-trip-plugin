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






function countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === what) {
            count++;
        }
    }
    return count;
}

// function countInArray(array, what) {
//     return array.filter(item => item == what).length;
// }

function arrayEquals(a, b) {
return Array.isArray(a) &&
  Array.isArray(b) &&
  a.length === b.length &&
  a.every((val, index) => val === b[index]);
}




window.onload = function() {

  //============================================================
  //============================================================
  //get all attributes of span#meta-filters
  var metafilterSpan = document.getElementById('meta-filters');

  //exclude the 'id' attribute from the array
  metafilterSpan.removeAttribute('id');

  var metafilters = metafilterSpan.attributes;

  var metafiltersArray = [];

  for(var m=0; m < metafilters.length; m++) {
    metafiltersArray.push(metafilters[m].name);
  }


  //============================================================
  //============================================================




  //The Function that is run when a checkbox is clicked
  var trailFilter = function() {

    checkedArray = [];

    checkedMeta = [];


    //adds the value of each checked filter to the checkedArray
    for(var a=0; a < filterCheckbox.length; a++) {
      if(filterCheckbox[a].checked) {
        checkedArray.push("data-"+filterCheckbox[a].value);
        checkedMeta.push(filterCheckbox[a].dataset.filter);

      }
    }

    filteredStops = [];



    for(var i=0; i < checkedArray.length; i++) {
      var filteredStarps = document.querySelectorAll('['+checkedArray[i]+']');
      for(var o=0; o < filteredStarps.length; o++) {

        // if(filteredStops.includes(filteredStarps[o])) {
        //
        // }
        filteredStops.push(filteredStarps[o]);
      }
    }



    var filteredMeta = metafiltersArray.filter(value => checkedMeta.includes(value));
      //loops through each filtered stop
      for(var i=0; i < filteredStops.length; i++) {

        var filteredDestinationAttributes = [];

        for(var b = 0, n; n = filteredStops[i].attributes[b]; ++b) {
          filteredDestinationAttributes.push(n.name);
        }













        var filteredMetaAndDestinationAttributes = filteredDestinationAttributes.filter(value => filteredMeta.includes(value));

        //compares the filteredDestinationAttributes(stops) to the checkedArray(checkboxes) to determine if they share any values
        var filteredArray = checkedArray.filter(value => filteredDestinationAttributes.includes(value));

        console.log("===================================="+filteredStops[i].outerText+"====================================")

        console.log("filteredMeta")
        console.log(filteredMeta)
        console.log("filteredDestinationAttributes");
        console.log(filteredDestinationAttributes);
        console.log("checkedArray");
        console.log(checkedArray);





        finalArray = checkedArray.filter(value => filteredArray.includes(value));
        console.log("finalArray");
        console.log(finalArray);



        // const array1 = [5, 12, 8, 130, 44];
        //
        // const found = array1.find(element => element > finalArray[j]);
        //
        // console.log(found);
        // // expected output: 12
        //








        for(j = 0; j < filteredMeta.length; j++) {
          // console.log(checkedArray.find(element => finalArray[j]));
          // console.log(finalArray[j])

          if(filteredDestinationAttributes.includes(filteredMeta[j])) {
             console.log('%c Show? ', 'background: blue; color: #black');
          } else {
            console.log('%c Hide? ', 'background: orange; color: #black');
          }

          // if(checkedArray.find(element => finalArray[j]).length !== 0) {
          //   console.log('%c Show? ', 'background: blue; color: #black');
          // }
        }




        if(arrayEquals(checkedArray, finalArray)) {
            filteredStops[i].style.display="block";
            // console.log("show","background: green; color: black")
            console.log('%c Show! ', 'background: green; color: #black');
          } else {
            filteredStops[i].style.display="none";
              console.log('%c hide ', 'background: red; color: #black');
          }

          // if (filteredArray.length !== 0 ) {
          //
          //   filteredStops[i].style.display="block";
          // } else {
          //   filteredStops[i].style.display="none";
          // }
      }
      console.log("================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
  };

  var filterCheckbox = document.getElementsByClassName("filter-option");

  for(var i=0; i < filterCheckbox.length; i++) {
      filterCheckbox[i].addEventListener('click', trailFilter, false);
  }
}








      //   if(arrayEquals(filteredArray, checkedArray) && (filteredMeta.length === metafiltersArray.length)) {
      //     console.log(metafiltersArray.length);
      //     console.log(checkedArray.length);
      //
      //     filteredStops[i].style.display="block";
      //     filteredStops[i].setAttribute('data-ci-filtered', true);
      //   // } else if(filteredArray.length === 0) {
      //   //   // document.getElementsByClassName("filtered-destination").style.display="none";
      //   //
      //   //
      //   // }
      //
      // } else {
      //     filteredStops[i].style.display="none";
      //   }






        //
        // var metaCheckbox = [];
        //
        // // run trailFilter if a checkbox is clicked
        // for(var m=0; m < metafilters.length; m++) {
        //   metaCheckbox[m]= document.getElementsByClassName("filter-option-"+metafilters[m].name);
        // }
        //
        //
        //
        // for(var n=0; n < metaCheckbox.length; n++) {
        //     for(var d=0; d < metaCheckbox[n].length; d++) {
        //         metaCheckbox[n][d].addEventListener('click', trailFilter, false);
        //     }
        // }

      //   var trailFilter = function() {
      //     console.log("checked");
      // }


        // console.log(filterCheckbox);


// console.log("CHECKBOX   =====================METAFILTERS ARRAY======================");
// console.log("all available metafilters")
// console.log(metafiltersArray);
// console.log("");
// console.log("");
// console.log("");
//
// console.log("CHECKBOX   =====================FILTERED META======================");
// console.log("this is an array of the meta values of each selected checkbox, but removes the repeats from checkedMeta")
// console.log(filteredMeta);
// console.log("");
// console.log("");
// console.log("");

// console.log("DESTINATION   =====================FILTERED DESTINATION ATTRIBUTES======================");
// console.log("these are the attributes of this specific looped destination (see the above from the for loop)")
// console.log(filteredDestinationAttributes);
// console.log("");
// console.log("");
// console.log("");



// console.log("CHECKBOX   =====================CHECKED ARRAY======================");
// console.log("this is an array of all the selected checkboxes")
// console.log(checkedArray);
// console.log("");
// console.log("");
// console.log("");
//
//
// console.log("=====================CHECKED META======================");
// console.log("this is an array of the meta values of each selected checkbox");
// console.log(checkedMeta);
// console.log("");
// console.log("");


//
// console.log("=====================FILTERED STOPS======================");
// console.log("Displays a nodelist of each filtered stop")
// console.log(filteredStops);
// console.log("");
// console.log("");
// console.log("");


//
// console.log("COMPARE CHECKBOX META AND DESTINATION META    =====================FILTERED META AND DESTINATION ATTRIBUTES======================");
// console.log("this compares the filteredMeta and filteredDestinationAttributes and creates an array of the values they share")
// console.log(filteredMetaAndDestinationAttributes);
// console.log("");
// console.log("");
// console.log("");
//
// console.log("COMPARE CHECKBOX VALUE AND DESTINATION VALUE   =====================FILTERED ARRAY======================");
// console.log("compares the filteredDestinationAttributes(stops) to the checkedArray(checkboxes) to determine if they share any values")
// console.log(filteredArray);
// console.log("");
// console.log("");
// console.log("");
//

// console.log("");

// console.log("================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");
// console.log("");

//======================LEGACY VERSION=========================
//======================LEGACY VERSION=========================
//======================LEGACY VERSION=========================
// window.onload = function() {
//   var filterCheckbox = document.getElementsByClassName("filter-option");
//
//   var trailFilter = function() {
//
//     //get attribute of checkbox
//     var attribute = this.value;
//
//     //find all stops with the above attribute
//     var filteredStops = document.querySelectorAll('[data-'+attribute+']');
//
//
//     var checkedArray = [];
//
//     //adds the value of each checked filter to the checkedArray
//     for(var a=0; a < filterCheckbox.length; a++) {
//       if(filterCheckbox[a].checked) {
//         checkedArray.push("data-"+filterCheckbox[a].value);
//       }
//     }
//
//     //loops through each filtered stop
//     for(var i=0; i < filteredStops.length; i++) {
//
//       var filteredDestinationAttributes = [];
//
//       //adds the attributes of filtered stop to an array
//       for(var b = 0, n; n = filteredStops[i].attributes[b]; ++b) filteredDestinationAttributes.push(n.name);
//
//       //compares the filteredDestinationAttributes(stops) to the checkedArray(checkboxes) to determine if they share any values
//       var filteredArray = checkedArray.filter(value => filteredDestinationAttributes.includes(value));
//
//       if (filteredArray.length !== 0) {
//         filteredStops[i].style.display="block";
//       } else {
//         filteredStops[i].style.display="none";
//       }
//     }
//   };
//
//   //run trailFilter if a checkbox is clicked
//   for(var i=0; i < filterCheckbox.length; i++) {
//       filterCheckbox[i].addEventListener('click', trailFilter, false);
//   }
// }
//======================LEGACY VERSION=========================
//======================LEGACY VERSION=========================
//======================LEGACY VERSION=========================
