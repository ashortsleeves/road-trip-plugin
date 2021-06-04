<link rel="stylesheet" id="wp-block-library-css" href="<?php echo plugins_url()?>/road-trip/assets/css/road-trip.css" type="text/css" media="all">
<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
<script
  src="<?php echo plugins_url()?>/road-trip/assets/js/road-trip.js"></script>
<?php
  $cifields = cifields();
  $ci_meta_array = array();

  $rargs = array(
    'post_type'      => 'destination',
    'posts_per_page' => -1,
  );

  $ci_query = new WP_Query( $rargs );
?>
<!-- one possible solution would be to put the #feature-filter in the loop and find a way to run the js function for each metafilter -->
<div class="checkbox-wrap" id="feature-filter">
  <span id="meta-filters"<?php foreach ($cifields['ci_meta_filters'] as $ci_meta_filter){echo " ".stlr($ci_meta_filter['title']);} ?>></span>




  <?php foreach ($cifields['ci_meta_filters'] as $ci_meta_filter): ?>
    <?php $ci_meta_array[] = $ci_meta_filter;?>
    <h2><?php echo $ci_meta_filter['title']; ?></h2>
    <ul>
      <?php $i = 0; ?>
      <?php foreach($ci_meta_filter['ci_filters'] as $ci_filter): ?>
        <li>
          <input data-filter="<?php echo stlr($ci_meta_filter['title']);?>"  type="checkbox" name="<?php echo $ci_filter['title']; ?>" value="<?php echo stlr($ci_meta_filter['title']).'-'.$i; ?>" class="filter-option"> <?php echo $ci_filter['title']; ?>

          <!-- checked attribute is removed by default now -->
        </li>
        <?php $i++; ?>
      <?php endforeach; ?>
    </ul>

  <?php endforeach; ?>
</div>

<div class="map-wrap">
  <div id="map"></div>
  <div id="right-panel">
    <div>
      <b>Start:</b>
      <input type="text" id="start" value="Rutland, VT" />
      <br />
      <b>Waypoints:</b> <br />
      <i>(Ctrl+Click or Cmd+Click for multiple selection)</i> <br />

      <select multiple id="waypoints">

        <?php while($ci_query->have_posts()): $ci_query->the_post() ?>
          <?php
            $ci_address =  carbon_get_the_post_meta('line_1').' '.carbon_get_the_post_meta('line_2').' '.carbon_get_the_post_meta('city').' '.carbon_get_the_post_meta('state').' '.carbon_get_the_post_meta('zip');
          ?>

                    <!-- checked attribute is removed by default now so display is set to none-->
          <option class="filtered-destination" style="display:none;"
          <?php foreach($ci_meta_array as $ci_filter):
              $ci_metaz = carbon_get_the_post_meta( stlr($ci_filter['title']) );
              // echo "data-".stlr($ci_filter['title'])." ";
              echo stlr($ci_filter['title'])." ";
              foreach($ci_metaz as $ci_meta):
                echo "data-".stlr($ci_filter['title'])."-".$ci_meta." ";
            endforeach;
          endforeach;?>
           value="<?php echo $ci_address; ?>"><?php the_title(); ?></option>
        <?php endwhile; ?>
      </select>
      <br />
      <b>End:</b> <br />
      <input type="text" id="end" value="Rutland, VT" />
      <br />
      <input type="submit" id="submit" />
    </div>
    <div id="directions-panel"></div>
  </div>
</div>

<script
  src="https://maps.googleapis.com/maps/api/js?key=<?php echo $cifields['api_key']; ?>&callback=initMap&libraries=&v=weekly"
  async
></script>
