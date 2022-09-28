import React from 'react';
import { Col, Row } from 'antd';
function AntdGrid() {
  return (
    <Row wrap={false}>
      <Col span={12} style={{ marginRight: 40 }}>
        left
      </Col>
      <Col style={{ width: 120 }}>right</Col>
    </Row>
  );
}

export default AntdGrid;
