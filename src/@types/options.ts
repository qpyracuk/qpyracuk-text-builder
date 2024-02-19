interface IBaseOptions {
  /**
   * @description Text-builder will produce typed text
   */
  typed?: boolean;
}
interface INonPrettyOptions extends IBaseOptions {
  /**
   * @description Tab width in "pretty" mode
   */
  pretty?: false;
}

interface IPrettyOptions extends IBaseOptions {
  /**
   * @description Text-builder will produce human readable Text
   */
  pretty: true;
  /**
   * @description Tab width in "pretty" mode
   */
  tabWidth?: number | 'tab';
}

export type IOptions = IPrettyOptions | INonPrettyOptions;
