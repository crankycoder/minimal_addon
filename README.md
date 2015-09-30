# Demo of emscripten within an addon


This code demonstrates running emscripten_wget from within a Firefox
addon.

It assumes you have a modern functioning Firefox Addon SDK installed
that uses 'jpm'.

To view the expected output, run the python webserver with:

$ ./simpleweb.sh

Next run the sample emscripten demo by opening :

    http://127.0.0.1:8000/emscr/simple.html

You should see ::

```
Pre emscripten_wget
Post emscripten_wget
Valid file descriptor! Got fd: 3 for /sample.c
```


To run the addon code, keep the webserver running.

Then issue:   `make run`

This will startup a new Firefox with the addon code loaded.

Go to the addons menu, select 'extensions' and click on 'Debug' for
the addon to enable addon debugging. 

The addon code is triggered by overloading the navigator.geolocation
API.  The easiest way to start this is to go to maps.google.com and
click on the little `center on my location` cross hair in the bottom
right hand corner of Google maps.

If you click on the cross hair you will see something like this: 

```
    minimaladdon:Addon received message: [ignored_blob] index.js:16
    minimaladdon:Got indexedDB: [object Object] addon_demo.js:192
    minimaladdon:Got Blob instance: [object Blob] addon_demo.js:193
    minimaladdon:Got URL.createObjectURL : function createObjectURL() {
        [native code]
    } addon_demo.js:194
    minimaladdon:Addon Demo Mod: [object Object] index.js:19
    minimaladdon:Completed run.  Everything is ok! index.js:22
    minimaladdon:Pre emscripten_wget addon_demo.js:173
    minimaladdon:Browser.URLObject = function URL() {
        [native code]
    } addon_demo.js:4747 
```

Note that the "Completed run" message appears *before* the "Pre
emscripten_wget" print statement.  This indicates that _simple_demo
returned before the emscripten_wget function did.  This must mean that
emscripten_wget is running asynchronously.
