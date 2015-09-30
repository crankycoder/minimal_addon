#include <stdio.h>
#include "demo.h"
#include "emscripten.h"
#include <iostream>
#include <fcntl.h>

void EMSCRIPTEN_KEEPALIVE runHttpTrie() {
    const char* fname = "/sample.c";

    printf("Pre emscripten_wget\n");
    emscripten_wget("http://127.0.0.1:8000/emscr/main.cc", fname);
    printf("Post emscripten_wget\n");
    int fd = open(fname, O_RDONLY);
    if (fd != -1) {
        printf("Valid file descriptor! Got fd: %d for %s\n", fd, fname);
    } else {
        printf("Invalid file descriptor. Got fd: %d for %s\n", fd, fname);
    }
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
