function startOfflineScan() {
    // This method is just a dumb proxy to initiate a wifi scan
    // within the chrome process.  You can find the actual
    // offline scan code in index.js and looking for a
    // worker.port.on("run_emscr_wget") block.
    self.port.emit("run_emscr_wget", "ignored_blob");
}


 
exportFunction(startOfflineScan, unsafeWindow, {defineAs: "startOfflineScan"});
