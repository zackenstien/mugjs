# Mug.js
Mug.js is a full stack web framework written entirely in JavaScript.  It strives to be as fast as possible while implementing as much useful features as possible.  It does all the hard stuff in the background so you can focus on making your website better and more efficient!

**MUG.JS IS WORK IN PROGRESS!!** It may not have all the features that you'd like in a web framework *or* it might not function correctly.  If you experience any bugs or want to suggest any features, please create an [issue](https://github.com/zackenstien/mugjs/issues/new) and I'll get on it asap!

## Features
- Routing (including easy redirecting)
- Controllers

## Starting the Server
The server can easily be run (right out of the box!) with the `startServer.js` file.
```sh
node startServer
```

## Basic Routing
You can add routes in the `routes/web.js` file.  Everything should already be set up there, all you need to do is define your own routes.  You can use the `Route.HTTPMETHOD` function to add some routes to your website.

It takes a string (that is the path to your web page) and a function that is called whenever said path is loaded up on a browser.  It will send whatever the function returns as the ending result of the web page, like so:
```js
Route.get('/', () => {
    return 'Hello, world!';
});
```

**Available Methods:**
```js
Route.get(path, callback);
Route.post(path, callback);
Route.put(path, callback);
Route.patch(path, callback);
Route.delete(path, callback);
Route.options(path, callback);
```

Or, if you want to assign a path to a select multiple methods:
```js
Route.match(['get', 'post'], '/', function() {
    return 'Hello, world!';
});
```
Or if you want to allow all methods:
```js
Route.all('/', function() {
    return 'Hello, world!';
});
```

So whenever you go to `localhost` it should output
```
Hello, world!
```

## Less Basic Routing
You can define parameters in routes like you would in Express.JS, the only difference is how you get them. With Mug.js, they are passed as function arguments.
```js
Route.get('/:name', (name) => {
    return `Hello, ${name}!`;
});
```

Now when you go to `localhost/John` it will say:
```
Hello, John!
```