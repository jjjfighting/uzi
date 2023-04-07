export type Middleware<S> = (state: S) => Promise<void> | void;

export class Ware<S> {
  constructor() {}
  private middlewares: Middleware<S>[] = [];

  /** 加载中间件 */
  use(middleware: Middleware<S>): void {
    this.middlewares.push(middleware);
  }

  /** 执行所有中间件 */
  run(state: S) {
    this.middlewares.reduce((prev, curr) => {
      return prev.then(() => curr(state));
    }, Promise.resolve());
  }
}
