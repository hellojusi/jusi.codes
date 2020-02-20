---
layout: 'layouts/project.njk'
title: 'Bangor Region Chamber of Commerce'
description: >-
  During my time working with [RainStorm](https://rainstorminc.com), I built a new site for one of the largest Chambers in Maine.


  I developed an advanced backend admin system with custom ad management and implemented several integrations to their exisiting membership system.
intro: During my time working with [RainStorm](https://rainstorminc.com), I developed a new, mobile-friendly website for the Bangor Region Chamber of Commerce. It contains a wide array of information including member news and logo displays, news, events and social feeds and a variety of integrations and custom solutions.
url: 'https://bangorregion.com'
company: Bangor Region Chamber of Commerce
year: 2017
status: completed
responsibilities: front-end development (HTML, CSS, JS), WordPress implementation, integration with exisitng software
tags: projects
---

### Features

#### Ad management

The Chamber needed a dedicated space for online advertising and sponsorships. I leveraged custom post types and Advanced Custom Fields Pro to create a simple ad management system that suits their specific needs. Different zones can be selected per ad, allowing high level of ad placement customization.

```php
/**
 * Displays an ad in specified zone
 * Example: rsc_display_ads_in_zone( 'homepage-top' )
 *
 * @param string $zone
 * @return void
 */
function rsc_display_ads_in_zone( $zone ) {
  $args = array(
    'posts_per_page' => 1,
    'post_type' => 'rsc-ads',
    'post_status' => 'publish',
    'meta_query' => array(
      array(
        'key' => 'ad_zones',
        'value'	=> $zone,
        'compare'	=> 'LIKE'
      )
    )
  );

  $ads = new WP_Query( $args );

  if ( $ads->have_posts() ) :
    echo '<div class="sidebar-ads">';

    while ( $ads->have_posts() ) {
      $ads->the_post();
      echo '<a href="' . get_field( 'ad_url' ) . '">';
        echo wp_get_attachment_image( get_field( 'ad_image' ), 'full', '', '' );
      echo '</a>';
    }

    echo '</div>';
  }

  wp_reset_query();
}
```

#### ChamberMaster integration

The site includes an integration and styling of the ChamberMaster member and event management tool. I created custom templates that display information like members directory, job postings and application forms directly from ChamberMaster, while keeping the experience seemless for the end user.
