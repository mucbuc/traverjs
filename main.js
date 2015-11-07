var assert = require( 'assert' );

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
  assert( typeof cb === 'function' );

  return new Promise( function( resolve, reject ) {
    if (Object.keys(obj).length) {
      var index = 0;
      next();
      function next() {
        if (index < Object.keys(obj).length) {
          cb( obj[Object.keys(obj)[index++]], next );
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

module.exports = {
  array: traverseArray,
  object: traverseObject,
};