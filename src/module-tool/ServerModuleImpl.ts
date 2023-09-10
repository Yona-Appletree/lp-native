export interface ServerModuleImpl {
    init(): void;
    tick(): void;
    destroy(): void;
}