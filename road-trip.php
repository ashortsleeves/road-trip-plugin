<?php
/**
 * Plugin Name: Road Trip
 * Description: <strong>This is a plugin for adding destinations and plotting a road trip via Google Maps</strong>.
 * Version:     1.0.0
 * Author:      Craft Iconic
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License version 2, as published by the
 * Free Software Foundation.  You may NOT assume that you can use any other
 * version of the GPL.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.
 *
 * @package    RoadTrip
 * @since      1.0.0
 * @copyright  Copyright (c) 2021, Craft Iconic
 * @license    GPL-2.0+
 */


use Carbon_Fields\Container;
use Carbon_Fields\Field;


add_action( 'carbon_fields_register_fields', 'crb_attach_theme_options' );

function crb_attach_theme_options() {
  //Add Settings Page
  Container::make( 'theme_options', __( 'Road Map Settings' ) )
    ->set_page_parent( 'edit.php?post_type=destination' )
      ->add_fields( array(
        Field::make( 'text', 'ci_api_key', 'Google Maps API Key' )
          ->set_attribute( 'maxLength', 50 ),
        Field::make( 'complex', 'ci_meta_filters', 'Road Map Filters' )
            ->add_fields( array(
                Field::make( 'text', 'title', 'Filter Category' )->set_attribute('placeholder', 'ex: "Filter your trip by the following options"'),
                Field::make( 'complex', 'ci_filters', '')
                    ->add_fields( array(
                        Field::make( 'text', 'title', 'Filter Name' ),
                    ) ),
            ) ),
      ) );
}



add_action( 'after_setup_theme', 'crb_load' );

//Boot Carbon Fields Library
function crb_load() {
  require_once( plugin_dir_path(__FILE__) . '/vendor/autoload.php');
  Carbon_Fields\Carbon_Fields::boot();
}


//Pass stored Carbon Fields to views
add_action( 'carbon_fields_fields_registered', 'cifields' );

function cifields() {
  $data = array(
    'api_key'         => carbon_get_theme_option( 'ci_api_key' ),
    'ci_meta_filters' => carbon_get_theme_option( 'ci_meta_filters' ),
  );
  return $data;
}

//Register Destination Fields
add_action( 'carbon_fields_register_fields', 'crb_attach_destination_options' );

function crb_attach_destination_options() {

  Container::make('post_meta', __('Destination Options'))
    ->where('post_type', '=', 'destination')
    ->add_fields(array(
      Field::make('text', 'line_1', 'Address Line 1')->set_required(true),
      Field::make('text', 'line_2',  'Address Line 2'),
      Field::make('text', 'city', 'City')->set_required(true)->set_classes("ci-third"),
      Field::make('text', 'state', 'State')->set_required(true)->set_classes("ci-third"),
      Field::make('text', 'zip', 'Zip')->set_required(true)->set_attribute('maxLength', 5)->set_classes("ci-third"),
      Field::make('text', 'website', 'Website'),
      Field::make('text', 'phone', 'Phone')->set_attribute('placeholder', '(000) 000-0000')->set_attribute('maxLength', 14),
      Field::make('text', 'email', 'Email'),
    ));
}

//Add Register Filters
add_action( 'carbon_fields_register_fields', 'crb_attach_destination_filters' );

function crb_attach_destination_filters() {

  $ci_metafilters = array();

  foreach(cifields()['ci_meta_filters'] as $ci_meta) {

    $ci_filters = array();

    foreach($ci_meta['ci_filters'] as $ci_filter_single => $value) {
      $ci_filters[] = $value['title'];
    }

    Container::make('post_meta', $ci_meta['title'])
      ->where('post_type', '=', 'destination')
      ->add_fields(array(
        Field::make( 'multiselect', strtolower(str_replace(' ', '-',$ci_meta['title'])), ' ' )
      ->add_options($ci_filters),
      ));
  }
}

//Register the Destination CPT
 add_action('init', function(){
   $labels = array(
     'name'                => __( 'Destinations' ),
     'singular_name'       => __( 'Destination' ),
     'menu_name'           => __( 'Road Trip'),
     'parent_item_colon'   => __( 'Parent Destinations'),
     'all_items'           => __( 'All Destinations'),
     'view_item'           => __( 'View Destinations'),
     'add_new_item'        => __( 'Add New Destination'),
     'archives'            => __( 'Destination Archives', 'text_domain' ),
     'add_new'             => __( 'Add New'),
     'edit_item'           => __( 'Edit Destination'),
     'update_item'         => __( 'Update Destination'),
     'search_items'        => __( 'Search Destinations'),
     'not_found'           => __( 'Not Found'),
     'not_found_in_trash'  => __( 'Not found in Trash'),
   );
   $args = array(
       'labels'             => $labels,
       'description'        => 'Destination custom post type.',
       'public'             => true,
       'publicly_queryable' => true,
       'show_ui'            => true,
       'show_in_menu'       => true,
       'menu_icon'           => 'dashicons-location-alt',
       'query_var'          => true,
       'capability_type'    => 'post',
       'has_archive'        => true,
       'hierarchical'       => false,
       'menu_position'      => 20,
       'supports'           => array( 'title', 'editor', 'author', 'thumbnail' ),
       'taxonomies'         => array( 'category', 'post_tag' ),
       'show_in_rest'       => true
   );
   register_post_type( 'destination', $args );
 });

 //Add Road Trip Shortcode
 function road_map_shortcode() {
   include( plugin_dir_path( __FILE__ ).'/assets/templates/map.php');
 }

 add_shortcode('road_map', 'road_map_shortcode');

 //Admin CSS
 function admin_style() {
   wp_enqueue_style('admin-styles', plugins_url() .'/road-trip/assets/css/road-trip-admin.css');
 }

 add_action('admin_enqueue_scripts', 'admin_style');
