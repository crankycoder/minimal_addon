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
                                      console.log("Read " + bytes.length + " bytes");
                                  }
                              });
                      } catch (e) {
                          console.log(e);
                      }
                  });
              }
});



