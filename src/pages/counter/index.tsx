import './index.less';
import { Row } from 'antd';
import React, { useContext, useState } from 'react';
import Counter1 from './Counter1';
import Counter2 from './Counter2';
import Counter3 from './Counter3';
import Counter4 from './Counter4';

// 利用hooks就是由外部去维护一个受控的组件
function useCounter() {
  const [value, setCount] = useState(0);
  function handleIncrement() {
    console.log('hook加方法，添加受控逻辑');
    setCount(value + 1);
  }
  function handleDecrement() {
    console.log('hook减方法，添加受控逻辑');

    setCount(value - 1);
  }
  return {
    value,
    handleIncrement,
    handleDecrement,
  };
}

export default function IndexPage() {
  const [count, setCount] = useState(0);
  const {
    value: counter4Value,
    handleIncrement,
    handleDecrement,
  } = useCounter();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>第一个counter</h1>
      <ul>
        <li>
          最常见的业务组件封装，状态在内部维护，可以通过onXX来获取内部的状态
        </li>
      </ul>
      <Counter1
        max={10}
        label="label"
        onChange={(value) => {
          console.log('counter1 onchange', value);
        }}
      />
      <h1>第二个counter</h1>
      <ul>
        <li>好处：</li>
        <li>减少api的复杂度，props划分给了不同的内部组件进行使用</li>
        <li>每个子组件只关心自己的配置项</li>
        <li>
          实现了数据和并更统一维护，可以灵活的调整组件之间的ui，利用context可以方便进行组件内部的状态管理
        </li>
        <li>
          ui的灵活度大大提高，只渲染children，把容器组件的渲染交给了外层，我只提供原子组件来交给你配置
        </li>
        <li>劣势：组件的ui更加灵活，组件的控制力度减弱</li>
      </ul>
      <Counter2
        onChange={(value) => {
          console.log('counter2 onchange', value);
        }}
      >
        <Row>
          <Counter2.Label label="323"></Counter2.Label>
          <Counter2.Increment max={10}></Counter2.Increment>
          <Counter2.Decrement></Counter2.Decrement>
          <Counter2.Count></Counter2.Count>
        </Row>
      </Counter2>
      <h1>
        第三个counter，我们在count2的基础上添加了受控能力，把状态从组件内拿到了组件外
      </h1>
      <ul>
        <li>
          好处：组件的状态由外部提供，变成了受控组件，使用起来更加灵活，同时能响应更多的请求
        </li>
        <li>
          弊端：组件的控制能力越来越差，原来的逻辑都封装在组件内部，现在需要交给消费者自己控制，自己创建usestate
        </li>
      </ul>
      <Counter3
        value={count}
        onChange={(newValue) => {
          setCount(newValue);
          console.log('counter3 change:', newValue);
        }}
      >
        <Row>
          <Counter3.Label label="323"></Counter3.Label>
          <Counter3.Increment max={10}></Counter3.Increment>
          <Counter3.Decrement></Counter3.Decrement>
          <Counter3.Count></Counter3.Count>
        </Row>
      </Counter3>
      <h1>
        第四个counter，
        在counter3的基础上，我们利用hooks，不仅添加了受控能力，同时让usestate变得更加语义化
      </h1>
      <ul>
        <li>
          优势：相比于control props，有更大的控制权。可以在jsx
          ui表达和hook函数中插入自己的自定义逻辑
        </li>
        <li>组件暴露方法给外部进行使用。</li>
        <li>弊端</li>
        <li>复杂度进一步的提高</li>
        <li>
          ui和逻辑进一步的进行了分离，组件的使用者对渲染和逻辑的部分感知了更多
        </li>
        <li>用户感知越多，那么使用起来心智负担越重</li>
      </ul>
      <Counter4
        value={counter4Value}
        onChange={(value) => {
          console.log('counter4Value:', value);
        }}
      >
        <Row>
          <Counter4.Label label="323"></Counter4.Label>
          <Counter4.Increment
            max={10}
            onClick={handleIncrement}
          ></Counter4.Increment>
          <Counter4.Decrement onClick={handleDecrement}></Counter4.Decrement>
          <Counter4.Count></Counter4.Count>
        </Row>
      </Counter4>
      <h1>第三种和第四种的状态处理不同</h1>
      <ul>
        <li>
          在第三种情况下，onchange只不过是接受一个最新值，然后利用usestate驱动react的视图更新，具体count的值变化多少，还是在内部定义的。由内向外的回调再进行驱动
        </li>
        <li>
          在第四种情况下，value是最新的值，同时increment和decrement方法是真正的用来驱动视图的方法。由外向内。
        </li>
      </ul>

      <h1>
        一个组件的简单易用，说明内部维护了更多的状态，不需要手动去编写逻辑。这也以为着传递了更多的配置项。不管是通过主要组件还是sub组件
      </h1>
      <h1>
        一个组件为了高度自定义，可以使用hooks来封装自己的状态管理，然后把不同的handle方法传递给ui组件进行使用。ui组件只负责调用方法，不具备逻辑
      </h1>
    </div>
  );
}
