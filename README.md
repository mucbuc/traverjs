## array example: 
```  
traverjs( ['hello', 'whale' ], (element, next) => {
  console.log( element );
  next();
})
.then( () => {
  console.log( 'done' );
});
```
=>
```
hello
whale
done
```


## object example: 
```
  traverjs( { "hello": "whale" }, (element, next) => {
    console.log( element );
    next();
  })
  .then( () => {
    console.log( 'done' );
  });
```
=>
```
{ hello: 'whale' }
done
```