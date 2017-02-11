#!/usr/bin/env node

var test = require( 'tape' )
  , traverjs = require( './main.js' )
  , Expector = require( 'expector' ).SeqExpector;

test( 'empty object', t => {
  traverjs( {}, t.fail.bind( t, "callback should not get invoked" ) )
  .then( t.end.bind( t ) )
  .catch( t.fail.bind( t, "catch block should not get invoked" ) );
});

test( 'object', t => {
  var expector = new Expector(t);
  
  expector
  .expect( { "hello": "whale" } )
  .expectNot( 'catch' );
  
  traverjs( { "hello": "whale" }, (o, next) => {
    expector.emit( o );
    next();
  } )
  .then( expector.check.bind( expector ) )
  .catch( t.fail.bind( t, "catch block should not get invoked" ) );
});

test( 'empty array', t => {
  traverjs( [], t.fail.bind( t, "callback should not get invoked" ) )
  .then( t.end.bind( t ) )
  .catch( t.fail.bind( t, "catch block should not get invoked" ) );
});

test( 'array', t => {
  var expector = new Expector(t);
  
  expector
  .expect( 'hello' )
  .expect( 'whale' )
  .expectNot( 'catch' );

  traverjs( ['hello', 'whale' ], (element, next) => {
    expector.emit( element );
    next();
  })
  .then( expector.check.bind( expector ) )
  .catch( t.fail.bind( t, "catch block should not get invoked" ) );
});

test( 'string', t => {
  var expector = new Expector(t);
  
  expector.expect( 'word' );
  
  traverjs( 'word', (element, next) => {
    expector.emit( element ); 
    next();
  })
  .then( expector.check.bind( expector ) )
  .catch( t.fail.bind( t, "catch block should not get invoked" ) );
})
