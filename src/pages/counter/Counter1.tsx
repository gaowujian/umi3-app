import { Row } from 'antd';
import { useState } from 'react';

interface Counter1Props {
  label: string;
  onChange: (value: number) => void;
  max: number;
}

export default function Counter1(props: Counter1Props) {
  const { label, onChange, max } = props;
  const [count, setCount] = useState(0);
  return (
    <Row>
      <button
        onClick={() => {
          setCount(count - 1);
          onChange(count - 1);
        }}
      >
        -
      </button>
      <div>{label}</div>
      <div>{count}</div>
      <button
        onClick={() => {
          const newCount = count + 1;
          if (newCount <= max) {
            setCount(count + 1);
            onChange(count + 1);
          }
        }}
      >
        +
      </button>
    </Row>
  );
}
