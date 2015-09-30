var self = require("sdk/self");
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

var {Cc, Ci, Cu, Cr, Cm, components} = require("chrome");

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
                          var addon_demo_mod = require("./emscr/addon_demo").factory();
                          console.log("Addon Demo Mod: " + addon_demo_mod);

                          addon_demo_mod._start_demo();
                          console.log("Completed run.  Everything is ok!");
                      } catch (e) {
                          console.log(e);
                      }
                  });
              }
});



