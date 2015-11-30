## EXAMPLE 1: 
```  
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
```

## EXAMPLE 2: 
```
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
```