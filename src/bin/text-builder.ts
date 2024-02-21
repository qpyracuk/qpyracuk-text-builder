import type { IConstructorParams } from '@/@types/params';
import type { INode } from '@qpyracuk/iterator';
import Iterator from '@qpyracuk/iterator';

const PRIMITIVES = new Set(['number', 'string', 'boolean', 'symbol', 'bigint']);

const typeMap = new Map<string, string>([
  ['number', '(number)'],
  ['string', '(string)'],
  ['boolean', '(boolean)'],
  ['bigint', '(bigint)'],
  ['symbol', '(symbol)'],
  ['object', '(object)'],
  ['array', '(array)'],
  ['map', '(map)'],
  ['set', '(set)'],
  ['undefined', '(undefined)'],
  ['function', '(function)'],
  ['', '']
]);

export default class Builder {
  /** Tab generator */
  private $__tab: (level: number) => string;
  /** Tab symbols */
  private $__tabString: string;
  /** Tab map */
  private $__tabMap: Map<number, string> = new Map();
  /** Break generator */
  private $nextLine: string;
  /** Type generator */
  private $__typeGenerator: ((type: string) => string) | (() => string);

  /** Safety value */
  private $__safeValue(value: unknown): string {
    if (typeof value === 'string') return ': ' + value.replace(/(<|>)/g, '');
    else return ': ' + String(value);
  }
  /** Safety key */
  private $__safeKey(key: string) {
    if (/^\d+$/.test(key)) {
      return `${String(key)}`;
    } else return key;
  }

  constructor(params: IConstructorParams) {
    const pretty = params.pretty;
    const typed = params.typed;
    const tab = params.tab;
    this.$__tabString = tab;
    if (pretty) {
      this.$__tab = this.$__tabGeneratorMethod.bind(this);
      this.$nextLine = '\n';
    } else {
      this.$__tab = () => '';
      this.$nextLine = ' ';
    }
    this.$__typeGenerator = typed ? this.$__typeGeneratorMethod.bind(this) : () => '';
  }

  /**
   * @description Serializes data into TEXT
   * @param {any} data Any data
   * @returns {string} Text
   */
  public stringify(data: unknown): string {
    const iterator = Iterator.createDepthFirstIterator(data);
    const stack: INode[] = [];
    let node: INode;
    let text: string = '';
    let deepLevel = 0;
    while (iterator.has()) {
      node = iterator.next() as INode;
      text += this.$__buildTag(node, stack);
      while (node.level < deepLevel && stack.length > 0) {
        stack.pop();
        --deepLevel;
      }
      deepLevel = node.level;
    }

    return text;
  }

  private $__buildTag(node: INode, stack: INode[]) {
    const parentTag = stack[stack.length - 1];
    const key = this.$__safeKey(node.key);
    const tab = this.$__tab(node.level);
    const isPrimitive = PRIMITIVES.has(node.type);
    if (!isPrimitive) stack.push(node);
    return parentTag === undefined
      ? isPrimitive
        ? `${tab}${key}${this.$__typeGenerator(node.type)}${this.$__safeValue(node.value)}${this.$nextLine}`
        : `${tab}${key}${this.$__typeGenerator(node.type)}:${this.$nextLine}`
      : isPrimitive
        ? parentTag.type === 'object' || parentTag.type === 'map'
          ? `${tab}${key}${this.$__typeGenerator(node.type)}${this.$__safeValue(node.value)}${this.$nextLine}`
          : `${tab}${key}${this.$__typeGenerator(node.type)}${this.$__safeValue(node.value)}${this.$nextLine}`
        : parentTag.type === 'object' || parentTag.type === 'map'
          ? `${tab}${key}${this.$__typeGenerator(node.type)}:${this.$nextLine}`
          : `${tab}${key}${this.$__typeGenerator(node.type)}:${this.$nextLine}`;
  }

  private $__tabGeneratorMethod(level: number): string {
    let tab: string | undefined = this.$__tabMap.get(level);
    if (tab === undefined) this.$__tabMap.set(level, (tab = this.$__tabString.repeat(level)));
    return tab;
  }

  private $__typeGeneratorMethod(type: string) {
    return typeMap.get(type) as string;
  }
}
