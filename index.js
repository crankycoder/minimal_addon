var self = require("sdk/self");
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

var {Cc, Ci, Cu, Cr, Cm, components} = require("chrome");

var page = pageMod.PageMod({
    include: "*",
    contentScriptWhen: "start",
    contentScriptFile: [data.url("geo-script.js"), data.url("customWifi.js")],
    contentScriptOptions: {
        showOptions: true
    },
    onAttach: function(worker) {
                  worker.port.on("run_emscr_wget", function(addonMessage) {
                      console.log("Addon received message: ["+addonMessage+"]");
                      var addon_geo = require("./emscr/addon_geo");
                      console.log("Addon Geo: " + addon_geo);

                      var addon_geo_mod = addon_geo.factory();
                      console.log("Addon Geo Mod: " + addon_geo_mod);
                  });
              }
});



