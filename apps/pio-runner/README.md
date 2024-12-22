# Phase 1

A project setup to ease development of code that runs on an esp32 with a web ui.

Goals:

- Web UI in Svelte or similar
- Server running on esp32 with websockets
- Javascript execution on server
- Abstraction for sending messages between client and server
- Two kinds of native functions:
    - pure, are compiled to WebAssembly for use from client
    - system, must be re-implemented in javascript
- Test harness in browser with auto-reloading, that uses native code

# Phase 2

An LED visualization framework designed to run headless on microcontrollers such as an esp32
or larger more capable machines.

The primary goal is to make it easy to design interactive LED projects using commodity
hardware.

## Architecture

- Javascript/Typescript is the primary language for effects code.
- Backend
    - Functions can be implemented in C/C++ for speed, and are compiled to WebAssembly for access on the frontend
    - Projects:
        - are stored on the server
        - can be loaded/unloaded
        - consist of a tree of scopes
    - Scopes:
        - are collections of entities, used for organization
        - can be enabled/disabled
    - Entities:
        - are where the main logic lives
        - can be enabled/disabled
        - have persistent config json
        - have internal json state
        - expose functions written in DukTape-compatible Javascript or C/C++
        - api:
            - init()
            - tick()
            - destroy()
    - System is tick-based. Each frame:
        - All enabled entities are ticked
-

Basic idea is two frameworks:

- backend framework, running on the server
- frontend framework, running on the browser

A project is a set of configuration/code that lives on the backend

Projects 