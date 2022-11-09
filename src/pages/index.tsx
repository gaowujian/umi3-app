import styles from './index.less';

import { BoldExtension, ItalicExtension } from 'remirror/extensions';
import {
  Remirror,
  useRemirror,
  EditorComponent,
  useHelpers,
  useKeymap,
} from '@remirror/react';
import { useCallback, useMemo } from 'react';
import { SampExtension } from './SampExtension';
import Menu from './Menu';

export default function IndexPage() {
  const { manager, state } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new SampExtension(),
    ],

    // Set the initial content.
    content: '请输入播报<b>话术</b> <samp>sample!!!</samp>',

    // Place the cursor at the start of the document. This can also be set to
    // `end`, `all` or a numbered position.
    selection: 3,

    // Set the string handler which means the content provided will be
    // automatically handled as html.
    // `markdown` is also available when the `MarkdownExtension`
    // is added to the editor.
    stringHandler: 'html',
  });
  console.log(state);

  const hooks = [
    () => {
      const { getJSON } = useHelpers();

      const handleSaveShortcut = useCallback(
        ({ state }) => {
          console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);

          return true; // Prevents any further key handlers from being run.
        },
        [getJSON],
      );

      // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
      useKeymap('Mod-s', handleSaveShortcut);
    },
  ];

  return (
    <div>
      <div>editor state:(编辑器状态){JSON.stringify(state)}</div>

      <div style={{ border: '1px solid red' }}>
        <Remirror manager={manager} initialContent={state} hooks={hooks}>
          <Menu />
          <EditorComponent />
        </Remirror>
      </div>
    </div>
  );
}
