$('.filter-option').each(function(){
  $(this).change(function() {
    //when an input.filter-option is checked, I use the data-meta-filter="" attribute to find the ul with the same id and give it a data-meta-required="true"


    $metaFilter = "#"+$(this).data('meta-filter');
    $metaChildren = $($metaFilter).find('.filter-option');
    $trueCount = 0;

    $($metaChildren).each(function(){
      if(this.checked) {

          $($metaFilter).attr('data-meta-required',true);

          $trueCount++;
      }
    });
    //when an input.filter-option is UNCHECKED, I check each input.filter-option that is a child of the ul to see if it is checked. If none are checked, the parent ul is given data-meta-required="false"
    if($trueCount == 0) {
      $($metaFilter).attr('data-meta-required',false);
    }

    // (then) when an input.filter-option is checked, loop through all metafilters that are required. All available metafilters can be gathered from the #id of each ul where required="true"
    $requiredMetas = $('ul.meta-filter[data-meta-required="true"]');


    //then I want to get the value="" of every input.filter-option that is a child of the required metafilter.

    $($requiredMetas).each(function() {
      $allValues = $(this).find('.filter-option:checked');


      $metaDestinationFilter = "data-"+$(this).attr('id');


      $('.filtered-destination').each(function(){
        //for each filtered destination, check to see if its data-filters=[] array contains the specified allValue
        var greenLightArray = [];

        //if the destinations data-filters=[] contains the specified Value, "true" is pushed to the greenLightArray, else "false" is
        for($i = 0; $i < $allValues.length; $i++) {
            $destinationFilters = $(this).data('filters');
            if($allValues.length == 0) {
              greenLightArray[$i] = false;
            } else if($.inArray($allValues[$i].value, $destinationFilters) !== -1) {
              greenLightArray[$i] = true;
            } else {
              greenLightArray[$i] = false;
            }

        }
        //if a single "true" is present in the greenLightArray, the that Destination is "greenlit" for that specific metafilter
         if($.inArray(true, greenLightArray)!== -1) {
           $(this).attr($metaDestinationFilter, "true");

         } else {
           $(this).attr($metaDestinationFilter, "false");
         }
      });
    });

    //finally, we check each destination to see if each required meta filter is true.
    $('.filtered-destination').each(function(){
      var finalShow = [];
      for($i = 0; $i < $requiredMetas.length; $i++) {
        $finalAttr = "data-"+$($requiredMetas[$i]).attr('id');

        if($(this).attr($finalAttr) == 'true') {
          finalShow[$i] = true;
        } else {
          finalShow[$i] = false;
        }
      }

      if($.inArray(false, finalShow) !== -1) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });
});
