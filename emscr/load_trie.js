
# Assume you're running ./simpleweb.sh from the cwd of 
# /Users/victorng/dev/libmarisa/libraries/marisa/tests

var aFileURL = "http://127.0.0.1:8000/demo.record_trie";

var ios = Components.classes["@mozilla.org/network/io-service;1"].
          getService(Components.interfaces.nsIIOService);

var url = ios.newURI(aFileURL, null, null);

if (!url || !url.schemeIs("file")) {
    throw "Expected a file URL.";
}

var pngFile = url.QueryInterface(Components.interfaces.nsIFileURL).file;

var istream = Components.classes["@mozilla.org/network/file-input-stream;1"].
              createInstance(Components.interfaces.nsIFileInputStream);

istream.init(pngFile, -1, -1, false);

var bstream = Components.classes["@mozilla.org/binaryinputstream;1"].
createInstance(Components.interfaces.nsIBinaryInputStream);
bstream.setInputStream(istream);

var bytes = bstream.readBytes(bstream.available());
console.log("Byte length: " + bytes.length);
