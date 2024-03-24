import type { State } from "State";

export class Middleware {
  public onBeforeUpdate<T extends Record<string, any>>(state: State<T>) {}

  public onUpdate<T extends Record<string, any>>(state: State<T>) {}
}
