import { useContext, useState } from 'react';
import React from 'react';
const Counter2Context = React.createContext<any>(null);
export default function Counter2(props: {
  onChange: (val: number) => void;
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  props.onChange(count);
  return (
    <Counter2Context.Provider value={{ count, setCount }}>
      {props.children}
    </Counter2Context.Provider>
  );
}
Counter2.Increment = Increment;
Counter2.Decrement = Decrement;
Counter2.Label = Label;
Counter2.Count = Count;

function Decrement() {
  const { count, setCount } = useContext(Counter2Context);
  return (
    <button
      onClick={() => {
        setCount(count - 1);
      }}
    >
      minus---
    </button>
  );
}
function Increment(props: { max: number }) {
  const { count, setCount } = useContext(Counter2Context);

  return (
    <button
      onClick={() => {
        if (count + 1 <= props.max) {
          setCount(count + 1);
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
  const { count } = useContext(Counter2Context);

  return <div>{count}</div>;
}
