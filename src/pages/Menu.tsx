import { useActive, useCommands } from '@remirror/react';
import React from 'react';
import { useHelpers } from '@remirror/react';
function Menu() {
  const { toggleBold, focus } = useCommands();
  const active = useActive();
  console.log('active:', active.bold());
  console.log('active.doc():', active.doc());
  console.log('toggleBold:', toggleBold.enabled());
  // !传入一个true可能有性能问题
  const { getJSON, getHTML, getText } = useHelpers(true);
  console.log('getJSON():', getJSON());
  console.log('getJSON():', getHTML());
  console.log('getJSON():', getText());
  return (
    <div>
      <div>{JSON.stringify(active)}</div>
      {/* <div>json:{getJSON()}</div>
      <div>html:{getHTML()}</div>
      <div>text:{getText()}</div> */}
      <button
        disabled={toggleBold.enabled() === false}
        onClick={() => {
          toggleBold();
          focus();
        }}
      >
        B
      </button>
      <div>传递给后端的ssml内容:{getHTML()}</div>
    </div>
  );
}

export default Menu;
