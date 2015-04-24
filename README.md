# Argument
A helper for declaring your assumptions about method arguments.

## Usage

#### Browser style

```javascript
function someFunction(a, b, c) {
    args(someFunction, function(){
        args.expect(a).toBeDefined();
        args.expect(c).not.toBeTruthy();
    });
}
```

#### The same with ES6 syntax
```javascript
function someFunction(a, b, c) {
    args(someFunction, () => {
        args.expect(a).toBeDefined();
        args.expect(c).not.toBeTruthy();
    });
}
```

#### Node.js asynchronous callback style (not recommended)
```javascript
function someFunction(a, b, c, success, err) {
    if (args(someFunction, 
             function(){ 
                args.expect(a).toBeDefined();
             }, 
             err)) {
        return;
    }
}
```

## Motivation
It is very easy to misuse javascript functions  

## Inspiration
I had been using [Catel](http://catelproject.com) for some time and after some initial skepticism found their 
[argument checking](https://catelproject.atlassian.net/wiki/display/CTL/Argument+checking) 
extremely useful. In fact I am really convinced that such partial 
[design by contract](http://en.wikipedia.org/wiki/Design_by_contract) at arguments level is even more important for 
such nonrestrictive language as Javascript. 

Assertions code for args.expect was heavily borrowed from [Jasmine](https://github.com/jasmine/jasmine) 