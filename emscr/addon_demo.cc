#include <fcntl.h>
#include <iostream>
#include <stdio.h>

#include "addon_demo.h"
#include "emscripten.h"


void EMSCRIPTEN_KEEPALIVE runHttpTrie() {

}

void EMSCRIPTEN_KEEPALIVE start_demo(int length, char* payload) {
    printf("Got %d bytes inside emscripten!\n", length);
    printf("Start =================\n");
    for (int i=0; i < length; i++) {
        printf("Character [%d] = [0x%02x]\n", i, (0xff & payload[i]));
    }
    printf("End =================\n");

    EM_ASM(
        FS.mkdir('/IDBFS');
        FS.mount(IDBFS, {}, '/IDBFS');
    );
}
