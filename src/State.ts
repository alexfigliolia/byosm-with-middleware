import { EventEmitter } from "EventEmitter";
import type { Middleware } from "Middleware";
import type { Methods } from "types";

export class State<T extends Record<string, any>> {
  state: T;
  readonly name: string;
  readonly initialState: T;
  private readonly middleware: Middleware[] = [];
  private readonly Emitter = new EventEmitter<{ update: T }>();
  constructor(name: string, initialState: T) {
    this.name = name;
    this.initialState = initialState;
    this.state = { ...initialState };
  }

  public registerMiddleware(...middleware: Middleware[]) {
    this.middleware.push(...middleware);
  }

  public update(callback: (state: T) => void | Promise<void>) {
    this.executeLifeCycle("onBeforeUpdate");
    const result = callback(this.state);
    if (result instanceof Promise) {
      void result.then(() => {
        this.dispatchUpdate();
      });
      return;
    }
    this.dispatchUpdate();
  }

  private dispatchUpdate() {
    this.executeLifeCycle("onUpdate");
    this.Emitter.emit("update", this.state);
  }

  public subscribe(callback: (state: T) => void | Promise<void>) {
    return this.Emitter.on("update", callback);
  }

  public unsubscribe(ID: string) {
    return this.Emitter.off("update", ID);
  }

  private executeLifeCycle(method: Extract<keyof Methods<Middleware>, string>) {
    this.middleware.forEach((M) => {
      M[method](this);
    });
  }
}
