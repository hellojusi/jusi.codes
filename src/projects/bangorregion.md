---
layout: 'layouts/project.njk'
date: 2020-02-03
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

### Unique features & challenges

Every project is unique, has different requirements and often involves thinking outside of the box and hours of research. Here are some challenges I faced during the development process and features that make this one special.

#### Ad management

The Chamber needed a dedicated space for online advertising and sponsorships. I leveraged custom post types and Advanced Custom Fields Pro to create a simple ad management system that suits their specific needs.

The main requirement was to create several ad zones throughout the site, as well as have an option to create a site-wide campaign with a single ad. I created the Zones custom field in ACF with a predefined list of zones and customized it further with a filter – once a zone is selected and ad published, that zone becomes unavailable to choose for other ads.

{% imgPng 'bangor-ads', 'Bangor Region Chamber of Commerce ad management', 'Different zones can be selected per ad, allowing high level of ad placement customization.', 'up' %}

I also added a simple function that warns admins about selected site-wide campaigns when creating a new ad.

```php
/**
 * Displays a notification in the admin if there is a site-wide ad active elsewhere.
 */
function rsc_invisible_ad_admin_notice( $post ) {

  $args = array(
    'post_type'	=> 'rsc-ads',
    'post_status' => 'publish',
    'meta_query' => array(
      array(
        'key'	=> 'ad_all_zones',
        'value' => '1',
        'compare'	=> '=='
      )
    )
  );

  $sitewide = get_posts($args);

  if ( $post->post_type == 'rsc-ads' && !empty( $sitewide ) && !get_field( 'ad_all_zones', $post->ID ) ) {

    echo '<div class="notice error rsc-ad-notice">';
      echo '<p>This ad will not show because you have a <strong>site-wide</strong> ad active.</p>';
    echo '</div>';

  endif;
}

add_action( 'edit_form_after_title', 'rsc_invisible_ad_admin_notice' );
```

#### ChamberMaster integration

The site includes an integration and styling of the ChamberMaster member and event management tool. I created custom templates that display information like members directory, job postings and application forms directly from ChamberMaster, while keeping the experience seemless for the end user.
