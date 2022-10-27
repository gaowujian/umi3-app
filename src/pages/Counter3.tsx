import { useContext, useState } from 'react';
import React from 'react';
const Counter3Context = React.createContext<any>(null);
export default function Counter3(props: {
  onChange: (val: number) => void; // onchange只用来进行信息的传递和播报
  value: number;
  children: React.ReactNode;
}) {
  // !状态交给外部之后，内部只需要利用context的透传属性进行传值即可
  // 通过onChange把最新值传递给外面，让外面利用受控状态进行驱动

  return (
    <Counter3Context.Provider
      value={{ count: props.value, onChange: props.onChange }}
    >
      {props.children}
    </Counter3Context.Provider>
  );
}
Counter3.Increment = Increment;
Counter3.Decrement = Decrement;
Counter3.Label = Label;
Counter3.Count = Count;

function Decrement() {
  const { count, onChange } = useContext(Counter3Context);
  return (
    <button
      onClick={() => {
        onChange(count - 1);
      }}
    >
      minus---
    </button>
  );
}
function Increment(props: { max: number }) {
  const { count, onChange } = useContext(Counter3Context);

  return (
    <button
      onClick={() => {
        if (count + 1 <= props.max) {
          onChange(count + 1);
        }
      }}
    >
      plus+++
    </button>
  );
}
function Label(props: { label: string }) {
  return <div>{props.label}</div>;
}
function Count() {
  const { count } = useContext(Counter3Context);

  return <div>{count}</div>;
}
