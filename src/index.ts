import type { IOptions } from './@types/options';
import Builder from './bin/text-builder';

/**
 * @class TEXT Tools
 */
export default class TEXT {
  /**
   * @description Creates an instance of the text generator class
   * @param {IOptions} options build options
   * @returns {Builder} text-builder instance
   * @static
   */
  static createBuilder(options?: IOptions): Builder {
    if (options === undefined)
      return new Builder({
        tab: '  ',
        pretty: false,
        typed: false
      });
    const pretty: boolean | undefined = options.pretty,
      typed: boolean | undefined = options.typed,
      tabWidth: number | 'tab' | undefined = options.pretty ? options.tabWidth : undefined;

    let innerPretty: boolean, innerTyped: boolean, innerTabWidth: string;

    if (pretty !== undefined && typeof pretty === 'boolean') innerPretty = pretty;
    else innerPretty = false;

    if (typed !== undefined && typeof typed === 'boolean') innerTyped = typed;
    else innerTyped = false;

    if (tabWidth === undefined) innerTabWidth = '  ';
    else {
      if (typeof tabWidth === 'number' && tabWidth > 0) innerTabWidth = ' '.repeat(tabWidth);
      else if (tabWidth === 'tab') innerTabWidth = '\t';
      else innerTabWidth = '  ';
    }

    return new Builder({
      tab: innerTabWidth,
      pretty: innerPretty,
      typed: innerTyped
    });
  }
}
