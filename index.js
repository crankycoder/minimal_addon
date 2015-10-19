var self = require("sdk/self");
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

var {Cc, Ci, Cu, Cr, Cm, components} = require("chrome");

// Import NetUtil
Cu.import("resource://gre/modules/NetUtil.jsm");

var page = pageMod.PageMod({
    include: "*",
    contentScriptWhen: "start",
    contentScriptFile: [data.url("geo-script.js")],
    contentScriptOptions: {
        showOptions: true
    },
    onAttach: function(worker) {
                  worker.port.on("run_emscr_wget", function(addonMessage) {
                      console.log("Addon received message: ["+addonMessage+"]");
                      try {
                          NetUtil.asyncFetch("http://127.0.0.1:8000/simple.trie", 
                              function(aInputStream, aResult) {
                                  // Check that we had success.
                                  if (!components.isSuccessCode(aResult))
                                  {
                                      console.log("An error occured: " + aResult);
                                  } else {
                                      console.log("Success!");
                                      var bstream = Cc["@mozilla.org/binaryinputstream;1"].
                                            createInstance(Ci.nsIBinaryInputStream);
                                      bstream.setInputStream(aInputStream);
                                      var bytes = bstream.readBytes(bstream.available());

                                      // Ok, now this part is total
                                      // bullshit.  You need to
                                      // convert the bytes into an
                                      // array of uints and then have
                                      // it cast back to raw bytes in
                                      // C.
                                      // Extract each of `bytes.charCodeAt(index)`
                                      // and stuff it into an integer
                                      // array and pass it into C.
                                      console.log("Read " + bytes.length + " bytes");


                                      var addon_demo_mod = require("./emscr/addon_demo").factory();
                                      console.log("Addon Demo Mod: " + addon_demo_mod);

                                      // Extract the bytes and stuff
                                      // them into a heap allocated
                                      // object that C++ can read from
                                      var int_array = [];
                                      for (var i=0;i<bytes.length;i++) {
                                          int_array.push(bytes.charCodeAt(i));
                                      }
                                      var data = Uint32Array.from(int_array);

                                      var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
                                      var dataPtr = addon_demo_mod._malloc(nDataBytes);

                                      // Copy data to Emscripten heap
                                      // (directly accessed from Module.HEAPU8)
                                      var dataHeap = new Uint8Array(addon_demo_mod.HEAPU8.buffer,
                                                                    dataPtr,
                                                                    nDataBytes);
                                      dataHeap.set(new Uint8Array(data.buffer));


                                      // Call function and get result

                                      start_demo = addon_demo_mod.cwrap(
                                                'start_demo', null, ['number', 'number']
                                              );
                                      start_demo(data.length, dataHeap.byteOffset);

                                      addon_demo_mod._free(dataHeap.byteOffset);
                                  }
                              });
                      } catch (e) {
                          console.log(e);
                      }
                  });
              }
});



