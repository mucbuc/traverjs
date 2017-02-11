'use strict';

var assert = require( 'assert' ); 

function traverseArray( array, cb ) {
  
  assert( Array.isArray( array ) );

  return new Promise( function( resolve ) {
    let index = 0;
    next();
    function next() {
      if (index < array.length) {
        cb( array[index++], next );
      }
      else {
        resolve(); 
      }
    }
  });
}

function traverseObject( obj, cb ) {
  
  assert( obj && typeof obj === 'object' );
  
  return new Promise( function( resolve ) {
    const keys = Object.keys(obj);
    let index = 0;
    next();

    function next() {
      if (index < keys.length) {
        var key = keys[index++]
        cb( { [key]: obj[key] }, next );
      }
      else {
        resolve(); 
      }
    }
  });
}

module.exports = function( subject, cb ) {
  if (Array.isArray(subject)) {
    return traverseArray(subject, cb);
  }
  if (typeof subject === 'object') {
    return traverseObject(subject, cb);
  }
  return new Promise( function(resolve) {
    cb(subject, resolve);
  });
};