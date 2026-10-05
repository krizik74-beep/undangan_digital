<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Admin::index');

$routes->group('admin', function ($routes) {
    $routes->get('/', 'Admin::index');
    $routes->get('create', 'Admin::create');
    $routes->post('store', 'Admin::store');
    $routes->get('edit/(:num)', 'Admin::edit/$1');
    $routes->post('update/(:num)', 'Admin::update/$1');
    $routes->get('delete/(:num)', 'Admin::delete/$1');
    $routes->get('export', 'Admin::export');
    $routes->get('spreadsheet', 'Admin::spreadsheet');
    $routes->post('sync-google-sheets', 'Admin::syncGoogleSheets');

    // === MENU TUNGGAL: Asset Tampilan (Galeri + Kisah Cinta + We Are Wedding) ===
    $routes->get('aset', 'Admin::aset');
    $routes->get('aset/create/(:segment)', 'Admin::asetCreate/$1');
    $routes->post('aset/store/(:segment)', 'Admin::asetStore/$1');
    $routes->get('aset/edit/(:segment)/(:num)', 'Admin::asetEdit/$1/$2');
    $routes->post('aset/update/(:segment)/(:num)', 'Admin::asetUpdate/$1/$2');
    $routes->get('aset/delete/(:segment)/(:num)', 'Admin::asetDelete/$1/$2');

    // Rute lama dipertahankan sebagai redirect ke menu tunggal (kompatibilitas)
    // Galeri Foto CRUD
    $routes->get('gallery', 'Admin::gallery');
    $routes->get('gallery/create', 'Admin::galleryCreate');
    $routes->post('gallery/store', 'Admin::galleryStore');
    $routes->get('gallery/edit/(:num)', 'Admin::galleryEdit/$1');
    $routes->post('gallery/update/(:num)', 'Admin::galleryUpdate/$1');
    $routes->get('gallery/delete/(:num)', 'Admin::galleryDelete/$1');

    // Kisah Cinta Kami (Stories) CRUD
    $routes->get('stories', 'Admin::stories');
    $routes->get('stories/create', 'Admin::storyCreate');
    $routes->post('stories/store', 'Admin::storyStore');
    $routes->get('stories/edit/(:num)', 'Admin::storyEdit/$1');
    $routes->post('stories/update/(:num)', 'Admin::storyUpdate/$1');
    $routes->get('stories/delete/(:num)', 'Admin::storyDelete/$1');

    // We Are Wedding (Couple) CRUD
    $routes->get('couple', 'Admin::couple');
    $routes->get('couple/create', 'Admin::coupleCreate');
    $routes->post('couple/store', 'Admin::coupleStore');
    $routes->get('couple/edit/(:num)', 'Admin::coupleEdit/$1');
    $routes->post('couple/update/(:num)', 'Admin::coupleUpdate/$1');
    $routes->get('couple/delete/(:num)', 'Admin::coupleDelete/$1');
    // Acara Pernikahan (Events) CRUD
    $routes->get('events', 'Admin::events');
    $routes->get('events/create', 'Admin::eventCreate');
    $routes->post('events/store', 'Admin::eventStore');
    $routes->get('events/edit/(:num)', 'Admin::eventEdit/$1');
    $routes->post('events/update/(:num)', 'Admin::eventUpdate/$1');
    $routes->get('events/delete/(:num)', 'Admin::eventDelete/$1');
});

// FIX: gunakan huruf besar (GET, POST, OPTIONS) agar tidak deprecated di CI 4.7+
$routes->match(['GET', 'POST', 'OPTIONS'], 'api/rsvp', 'Api::rsvp');
$routes->match(['GET', 'POST', 'OPTIONS'], 'api_rsvp.php', 'Api::rsvp');
$routes->match(['GET', 'OPTIONS'], 'api/gallery', 'Api::gallery');
$routes->match(['GET', 'OPTIONS'], 'api/stories', 'Api::stories');
$routes->match(['GET', 'OPTIONS'], 'api/couple', 'Api::couple');
$routes->match(['GET', 'OPTIONS'], 'api/events', 'Api::events');

