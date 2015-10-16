#include <fcntl.h>
#include <iostream>
#include <stdio.h>

#include "addon_demo.h"
#include "emscripten.h"

void wget_on_load(const char* fname) {
    printf("wget_on_load: Post emscripten_wget\n");
    int fd = open(fname, O_RDONLY);
    if (fd != -1) {
        printf("Valid file descriptor! Got fd: %d for %s\n", fd, fname);
    } else {
        printf("Invalid file descriptor. Got fd: %d for %s\n", fd, fname);
    }

    printf("Completed loading: %s\n", fname);
}

void wget_on_err(const char* fname) {
    printf("wget_on_err: Post emscripten_wget\n");
    printf("Error loading: %s\n", fname);
}

void EMSCRIPTEN_KEEPALIVE runHttpTrie() {
    const char* fname = "/sample.c";

    printf("Pre emscripten_wget\n");

    emscripten_async_wget("http://127.0.0.1:8000/emscr/main.cc", 
                          fname,
                          wget_on_load, 
                          wget_on_err);

}

void EMSCRIPTEN_KEEPALIVE start_demo() {
    EM_ASM(
        FS.mkdir('/IDBFS');
        FS.mount(IDBFS, {}, '/IDBFS');

        // sync from persisted state into memory and then
        // run the 'test' function
        FS.syncfs(true, function (err) {
            assert(!err);
            ccall('runHttpTrie', 'v');
            });
    );
}
