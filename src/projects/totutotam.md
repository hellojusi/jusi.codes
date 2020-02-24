---
layout: 'layouts/project.njk'
title: 'To Tu To Tam'
description: >-
  Aga and Tom created To Tu To Tam to document their travels around the world.


  They asked me to migrate their old site from a travel blogging platform and build a completely custom WordPress solution.
intro: To Tu To Tam is a travel blog ran by Tom and Aga since 2011. They've been using a blogging platform Geoblog and were ready for a custom, self-hosted WordPress site. I worked with a design agency [Creatick](https://creatick.pl) to build a new home to document their adventures.
url: 'https://totutotam.blog'
company: Creatick
year: 2019
status: completed
responsibilities: front-end development (HTML, CSS, JS), WordPress custom theme development, Google Maps API integration
tags: projects
---

### Unique features & challenges

#### Information architecture

Tom and Aga's current site was using a travel blogging platform called Geoblog, which meant they had no control over how their content was organized and displayed.

They did like having posts grouped into trips wanted to keep a similar structure on their new site. Instead of creating a custom post type, I utilized WordPress' native posts and renamed the Categories default taxonomy (which they weren't going to use) to Trips. I added several custom fields using ACF Pro to implement additional features like taxonomy featured image and color.

They also wanted to separate short weekend trips around Poland from their larger trips around the world. To that end, we created a separate section on the homepage and added a simple true/false custom field to the Trip taxonomy to be able to distinguish between the two trip types.

#### Google Maps API integration

One of the client's main feature requests was to display their posts on a map, showing a full travel route on the trip archive page and single pin on post pages. With ACF's built-in Google Map field I was able to use a single source to display location information in a variety of ways:

- location markers for single posts
- full route drawn on the map on travel page
- SVG flag and location name displayed in the meta section of a post
- country marked on the homepage map using the [GeoChart API](https://developers.google.com/chart/interactive/docs/gallery/geochart)

```js
/*
 *  This function will render a Google Map onto the selected jQuery element
 *
 *  @param   $el (jQuery element)
 *  @return  n/a
 */

function new_map($el) {
  var $markers = $el.find('.marker');

  var args = {
    zoom: 6,
    center: new google.maps.LatLng(0, 0),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // create map
  var map = new google.maps.Map($el[0], args);

  // add a markers reference
  map.markers = [];
  var tripCoordinates = [];

  // add markers
  $markers.each(function() {
    add_marker($(this), map, tripCoordinates);
  });

  var tripPath = new google.maps.Polyline({
    path: tripCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  tripPath.setMap(map);

  return map;
}

/*
 *  This function will add a marker to the selected Google Map
 *
 *  @param   $marker (jQuery element)
 *  @param   map (Google Map object)
 *  @return  n/a
 */

function add_marker($marker, map, tripCoordinates) {
  var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));

  // create marker
  var marker = new google.maps.Marker({
    position: latlng,
    map: map
  });

  // add to array
  map.markers.push(marker);

  // build array of coords for polyline
  var coords = {
    lat: marker.position.lat(),
    lng: marker.position.lng()
  };
  tripCoordinates.push(coords);
}
```

### Client testimonial

<blockquote>“Working with Justyna is a pleasure. She has deep understanding of design and is very knowledgable about WordPress and best practices in modern web development. She worked with us to pick the right technical options for the project, answered questions and provided suggestions and advice on how to bring our ideas to life. Highly recommended!”
<footer><cite>Kamil Wójcik, <a href="https://creatick.pl">Creatick</a></cite></footer>
</blockquote>
