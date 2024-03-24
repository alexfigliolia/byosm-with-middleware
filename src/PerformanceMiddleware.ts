import { Middleware } from "Middleware";
import type { State } from "State";

export class PerformanceMiddleware extends Middleware {
  public threshold: number;
  private time: number | null = null;
  constructor(threshold = 16) {
    super();
    this.threshold = threshold;
  }

  public onBeforeUpdate<T extends Record<string, any>>(state: State<T>) {
    this.time = performance.now();
  }

  public onUpdate<T extends Record<string, any>>(state: State<T>) {
    if (this.time === null) {
      return;
    }
    const diff = performance.now() - this.time;
    if (diff > this.threshold) {
      console.log(
        `${state.name} had a slow state update. The update took ${diff}ms`
      );
    }
  }
}
