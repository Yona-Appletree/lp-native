/**
 * Interface given to entities to interact with the environment.
 */
export interface EntityAgent {
  listen(keyAndOptions: string, handler: (message: unknown) => void): void;

  send(messageKey: string, payload: unknown): void;
}
