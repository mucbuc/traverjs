var assert = require( 'assert' )
  , Promise = require( 'promise' ); 

function traverseArray( array, cb ) {
  
  assert( Array.isArray( array ) );

  return new Promise( function( resolve, reject ) {
    if (array.length) {
      var index = 0;
      next();
      function next() {
        if (index < array.length) {
          cb( array[index++], next );
        }
        else {
          resolve(); 
        }
      }
    }
    else {
      reject();
    }
  });
}

function traverseObject( obj, cb ) {
  
  assert( obj && typeof obj === 'object' );
  
  return new Promise( function( resolve, reject ) {
    var keys = Object.keys(obj);
    if (keys.length) {
 
      var index = 0;
      next();
      function next() {
        if (index < keys.length) {
          var key = keys[index++]
            , p = {};
          p[key] = obj[key];
          cb( p, next );
        }
        else {
          resolve(); 
        }
      }
    }
    else {
      reject();
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
};