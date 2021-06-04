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

    if(this.checked) {


      //then I want to get the value="" of every input.filter-option that is a child of the required metafilter.


      $($requiredMetas).each(function() {
        $allValues = $(this).find('.filter-option:checked');

        //this is for console.log purposes
        $requiredMeta = $(this).attr('id');


        $($allValues).each(function(){

            // check the data-filters='[]' of each option.filtered-destination to see if it contains this value
            $filteredValue = $(this).attr('value');



            $('.filtered-destination').each(function() {
              $destinationFilters = $(this).data('filters');


              $metaDestinationFilter = "data-"+$requiredMeta;



              //if (an option.filtered-destination contains a value from allValues){ it will be greenlit(return true)} else { it will return false }
              if($.inArray($filteredValue, $destinationFilters) !== -1) {

                $(this).attr($metaDestinationFilter, "true");
              }

            });
        });
      });
    } else {
      $('.filtered-destination').each(function() {
        $destinationFilters = $(this).data('filters');
        $metaDestinationFilter = "data-"+$requiredMeta;

        $(this).attr($metaDestinationFilter, "false");
      });
    }



// THIS CURRENTLY HIDES ALL IF SOMETHING IS UNCHECKED
    $($requiredMetas).each(function(){


      $finalAttr = "data-"+$(this).attr('id');

      $('.filtered-destination').each(function() {
        if($(this).attr($finalAttr)== 'true') {
          $(this).show();
        } else {
          $(this).hide();
        }
      });



    });
  });
});
