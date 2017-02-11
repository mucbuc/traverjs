#!/usr/bin/env node

'use strict';

const traverjs = require( './main.js' );

function objExample() {
  traverjs( { "hello": "whale" }, (element, next) => {
    console.log( element );
    next();
  })
  .then( () => {
    console.log( 'done' );
  });
}

function arrayExample() {
  traverjs( ['hello', 'whale' ], (element, next) => {
    console.log( element );
    next();
  })
  .then( () => {
    console.log( 'done' );
  });
}
