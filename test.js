#!/usr/bin/env node

var test = require( 'tape' )
  , traverjs = require( './main.js' )
  , Expector = require( 'expector' ).SeqExpector;

test( 'empty object', function(t) {
  var expector = new Expector(t);
  expector.expectNot( 'cb' );
  expector.expectNot( 'then' );
  expector.expect( 'catch' );
  traverjs( {}, function(o, next) {
    expector.emit( 'cb' );
    next();
  } )
  .then( function() {
    expector.emit( 'then' );
  } )
  .catch( function() {
    expector.emit( 'catch' );
    expector.check();
  });
});

test( 'object', function(t) {
  var expector = new Expector(t);
  expector.expect( { "hello": "whale" } );
  expector.expectNot( 'catch' );
  traverjs( { "hello": "whale" }, function(o, next) {
    expector.emit( o );
    next();
  } )
  .then( expector.check.bind( expector ) )
  .catch( function() {
    expector.emit( 'catch' );
  });
});

test( 'empty array', function(t) {
  var expector = new Expector(t);
  expector.expectNot( 'then' );
  expector.expect( 'catch' );
  traverjs( [] )
  .then( function() {
    expector.emit( 'then' );
    expector.check();
  } )
  .catch( function() {
    expector.emit( 'catch' );
    expector.check();
  });
});

test( 'array', function(t) {
  var expector = new Expector(t);
  expector.expect( 'hello' );
  expector.expect( 'whale' );
  expector.expectNot( 'catch' );
  traverjs( ['hello', 'whale' ], function(element, next) {
    expector.emit( element );
    next();
  })
  .then( expector.check.bind( expector ) )
  .catch( function() {
    expector.emit( 'catch' );
  });
});

test.only( 'string', function(t) {
  var expector = new Expector(t);
  expector.expect( 'word' );
  traverjs( 'word', function(element, next) {
    expector.emtt( element ); 
    next();
  })
  .then( expector.check.bind( expector ) )
  .catch( function() {
    expector.emit( 'catch' );
  });
})
