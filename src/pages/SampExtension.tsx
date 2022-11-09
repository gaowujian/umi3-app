import {
  ApplySchemaAttributes,
  extension,
  ExtensionTag,
  MarkExtension,
  MarkExtensionSpec,
  MarkSpecOverride,
} from '@remirror/core';

export interface SampOptions {}

@extension<SampOptions>({ defaultOptions: {} })
export class SampExtension extends MarkExtension<SampOptions> {
  get name() {
    return 'samp' as const;
  }

  createTags() {
    return [ExtensionTag.FormattingMark, ExtensionTag.FontStyle];
  }

  // ! 自定义标签的渲染逻辑
  // extra 有三个属性，
  // defaults是一个对象，用来返回标签的所有属性
  // parse 是一个函数，用于把dom信息转化为prosemirror的信息
  // dom也是一个函数，利用node节点上的属性来生成一个字符串属性的对象
  createMarkSpec(
    extra: ApplySchemaAttributes,
    override: MarkSpecOverride,
  ): MarkExtensionSpec {
    console.log('extra:', extra);
    console.log('override:', override);

    return {
      ...override,
      attrs: extra.defaults(),
      parseDOM: [
        {
          tag: 'samp',
          getAttrs: extra.parse,
        },
        ...(override.parseDOM ?? []),
      ],
      toDOM: (node) => {
        console.log('node:', node);
        return ['samp', extra.dom(node), 0];
      },
    };
  }
}
