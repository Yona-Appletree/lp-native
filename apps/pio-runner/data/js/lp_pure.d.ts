import '@types/emscripten';

export interface EmscriptenModule_lp_pure extends EmscriptenModule {
  ccall: typeof ccall;
  cwrap: typeof cwrap;
}

declare const moduleFactory: EmscriptenModuleFactory<EmscriptenModule_lp_pure>;

export default moduleFactory;