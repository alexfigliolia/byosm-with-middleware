import { Middleware } from "Middleware";
import type { State } from "State";

export class Logger extends Middleware {
  public override onBeforeUpdate<T extends Record<string, any>>(
    state: State<T>
  ) {
    console.log(`${state.name} is about to update`, { ...state.state });
  }

  public override onUpdate<T extends Record<string, any>>(state: State<T>) {
    console.log(`${state.name} updated!`, { ...state.state });
  }
}
