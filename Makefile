
EXTRA_EMSCRIPTEN_ARGS=-O0 -s ASYNCIFY=1 --pre-js buildtools/prefix.js --post-js buildtools/postfix.js


all:
	EXPORT_FUNCS=-s EXPORTED_FUNCTIONS='["_runHttpTrie"]'
	emcc -O0 -s NO_EXIT_RUNTIME=1 -s ASYNCIFY=1 $(EXPORT_FUNCS) emscr/main.cc emscr/demo.cc -o emscr/simple.html
	open http://127.0.0.1:8000/emscr/simple.html

addon:
	EXPORT_FUNCS=-s EXPORTED_FUNCTIONS='["_runHttpTrie", "_start_demo"]'
	emcc $(EXTRA_EMSCRIPTEN_ARGS) $(EXPORT_FUNCS) emscr/demo.cc -o emscr/addon_demo.js
	patch -p1 emscr/addon_demo.js emscr/addon.patch

run:
	jpm run
