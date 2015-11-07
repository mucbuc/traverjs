#!/usr/bin/env node

var test = require( 'tape' )
  , traverjs = require( './main.js' )
  , Expector = require( 'expector' ).SeqExpector;

test( 'empty', function(t) {
  var expector = new Expector(t);
  expector.expectNot( 'then' );
  expector.expect( 'catch' );
  traverjs.array( [] )
  .then( function() {
    expector.emit( 'then' );
    expector.check();
  } )
  .catch( function() {
    expector.emit( 'catch' );
    expector.check();
  });
});

test( 'basic', function(t) {
  var expector = new Expector(t);
  expector.expect( 'hello' );
  expector.expect( 'whale' );
  expector.expectNot( 'catch' );
  traverjs.array( ['hello', 'whale' ], function(element, next) {
    expector.emit( element );
    next();
  })
  .then( expector.check.bind( expector ) )
  .catch( function() {
    expector.emit( 'catch' );
  });
});