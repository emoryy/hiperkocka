/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'hiperkocka',
    environment: environment,
    baseURL: '/hiperkocka/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      defaultLocale: 'en', // Ember CLI i18n
      REBR_API_KEY: "2TnBqPFI5p",
      REBR_API_BASE: "https://rebrickable.com/api/"
    },

    contentSecurityPolicy: {
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com",
      'font-src': "'self' fonts.gstatic.com",
      'frame-src': "www.youtube.com",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' www.google-analytics.com",
      'connect-src': "'self' localhost:1337 rebrickable.com",
      'img-src': "'self' localhost:1337 rebrickable.com img.rebrickable.com"
    },

  };

  if (environment === 'development') {
    ENV.baseURL= '/';
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV['simple-auth'] = {
    authorizer: 'authorizer:custom',
    authenticationRoute: 'index',
    routeAfterAuthentication: 'app',
    authEndpoint: ENV.APP.AUTH_HOST + '/users/authenticate'
  };

  if (environment === 'development') {
    ENV['simple-auth'].crossOriginWhitelist = ['http://127.0.0.1:3000', 'http://127.0.0.1:9999'];
  }

  return ENV;
};
