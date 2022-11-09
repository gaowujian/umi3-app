import { useContext, useState } from 'react';
import React from 'react';
const Counter4Context = React.createContext<any>(null);
export default function Counter4(props: {
  onChange: (val: number) => void;
  value: number;
  children: React.ReactNode;
}) {
  // !状态交给外部之后，内部只需要利用context的透传属性进行传值即可
  props.onChange(props.value);
  return (
    <Counter4Context.Provider
      value={{ count: props.value, onChange: props.onChange }}
    >
      {props.children}
    </Counter4Context.Provider>
  );
}
Counter4.Increment = Increment;
Counter4.Decrement = Decrement;
Counter4.Label = Label;
Counter4.Count = Count;

function Decrement(props: { onClick: () => void }) {
  return (
    <button
      onClick={() => {
        props.onClick();
      }}
    >
      minus---
    </button>
  );
}
function Increment(props: { max: number; onClick: () => void }) {
  return (
    <button
      onClick={() => {
        props.onClick();
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
  const { count } = useContext(Counter4Context);

  return <div>{count}</div>;
}
