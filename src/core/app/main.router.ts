import {Router} from 'express';
import {
  isString,
  validatePath
} from '../../helper/utils/shared.utils';

export abstract class MainRouter {
  readonly prefix: string;
  readonly router: Router;

  constructor(name?: string | any) {
    this.prefix = this.buildRouterName(name);
    this.router = Router();
    this.onInit();
  }

  private buildRouterName(name?: string): string {
    name =
      name && isString(name)
        ? name
        : this.constructor.name.replace(/router/gi, '');
    if (name) return validatePath(name.toLocaleLowerCase());
    return 'none';
  }

  abstract onInit(): void;
}
