function traverse( array, cb ) {
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

module.exports = traverse;