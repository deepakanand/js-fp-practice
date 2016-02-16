var _ = require('lodash'); 
var expect = require('expect');

/////
// Partial application using Function.prototype.bind
/////

// Simple example
function add(a, b){
  return a + b;  
}

var increment = add.bind(null, 1);

expect(
    increment(5) 
  ).toEqual(6);

var incrementBy10 = add.bind(null, 10);

expect(
    incrementBy10(1) 
  ).toEqual(11);


var addVariadic = function(){
  var sum = 0;
  for(var idx = 0; idx < arguments.length; idx++){
    sum += arguments[idx] ;
  }
  return sum;
};

expect(
    addVariadic(1, 2, 3) 
  ).toEqual(6);

var adderOf_10_20 = addVariadic.bind(null, 10, 20);

expect(
    adderOf_10_20(1, 2) 
  ).toEqual(33);


////
// http://jrsinclair.com/articles/2016/gentle-introduction-to-functional-javascript-arrays/
/////
var numbers = [1, 3, 5, 7, 9];

var reduce = function(callback, initialValue, array){
  var workingValue = initialValue;
  for(var idx = 0; idx < array.length; idx++){
    workingValue = callback(workingValue, array[idx]);
  }  
  return workingValue;
};

expect(
    reduce(add, 0, numbers)
  ).toEqual(25);

// Partial application using author-defined versions of partial

var partialFirstOfTwo = function(fn, param1) {
    return function(param2) {
        return fn(param1, param2);
    };
};

var incrementBy20 = partialFirstOfTwo(add, 20);

expect(
    incrementBy20(2)
  ).toEqual(22);

var toArray = function(args){
    return Array.prototype.slice.call(args);
};

function partial() {
    // Convert the arguments variable to an array 
    var args = toArray(arguments);

    // Grab the function (the first argument). args now contains the remaining args.
    var fn = args.shift();

    // Return a function that calls fn
    return function() {
        var remainingArgs = toArray(arguments);
        return fn.apply(this, args.concat(remainingArgs));
    };
}

adder1020 = partial(addVariadic, 10, 20);

expect(
    adder1020(1, 2)
  ).toEqual(33);


////// Composition 
var compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i >= 0) {
            result = args[i].call(this, result);
            i = i - 1;
        }
        return result;
    };
};

var replace = function(find, replacement, str) {
    return str.replace(find, replacement);
};

var wrapWith = function(tag, str) {
    return '<' + tag + '>' + str + '</' + tag + '>'; 
};

var addBreaks      = partial(replace, '\n', '<br/>\n');
var replaceBrillig = partial(replace, 'brillig', 'four o’clock in the afternoon');
var wrapP          = partial(wrapWith, 'p');
var wrapBlockquote = partial(wrapWith, 'blockquote');

var poem = 'Twas brillig, and the slithy toves\n' + 
    'Did gyre and gimble in the wabe;\n' +
    'All mimsy were the borogoves,\n' +
    'And the mome raths outgrabe.';

var modifyPoem = compose(wrapBlockquote, wrapP, addBreaks, replaceBrillig);

modifyPoem(poem);


///////
// http://raganwald.com/2013/03/07/currying-and-partial-application.html
////////

var _map = [].map;

// create a functional version of map
function mapOn(list, fn){
 return _map.call(list, fn); // or list.map(fn)
}
function square(n){ return n*n; }


// Partial application

function mapWith(fn, list){  
  return function(list){
    return mapOn(list, fn);
  };  
}

expect(
    mapWith(square)([1, 2, 3])
  ).toEqual([ 1, 4, 9 ]);



////
// https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch4.html
//////

var curry = _.curry;

// What is curry-ing ?
// Call a function with fewer arguments than it expects
// It returns a new function that takes the remaining arguments.

// curried versions of string match and replace
var match = curry (function(what, str){
  return str.match(what);
});

var replace = curry(function(what, replacement, str){
  return str.replace(what, replacement);
});

// 1. Match spaces in text content
//naive
expect(
    "hello world".match(/\s+/g)
  ).toEqual([' ']);


// Curried version of match
var spaces =  match(/\s+/g);

// 2. Replace strings

var getVowels = replace(/[aeiou]/ig);

var censorVowels = getVowels("-");

expect(
   censorVowels('JavaScript')
  ).toEqual('J-v-Scr-pt');

// Curried version of add
var curriedAdd = curry(function(a, b){
  return a + b; 
});
expect(
    curriedAdd(2)(3)
  ).toEqual(5);

console.log('all tests pass');