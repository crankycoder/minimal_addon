all:
	EXPORT_FUNCS=-s EXPORTED_FUNCTIONS='["_runHttpTrie"]'
	emcc -O0 -s NO_EXIT_RUNTIME=1 -s ASYNCIFY=1 $(EXPORT_FUNCS) main.cc demo.cc -o simple.html
	open http://127.0.0.1:8000/simple.html

addon:
	EXPORT_FUNCS=-s EXPORTED_FUNCTIONS='["_runHttpTrie", "_start_demo"]'
	emcc -O0 -s NO_EXIT_RUNTIME=1 -s ASYNCIFY=1 $(EXPORT_FUNCS) demo.cc -o addon_demo.js
