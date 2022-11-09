import { Select } from 'antd';
import React from 'react';

function index() {
  return (
    <div>
      <Select defaultOpen>
        <Select.Option>1</Select.Option>
        <Select.Option>2</Select.Option>
      </Select>
    </div>
  );
}

export default index;
