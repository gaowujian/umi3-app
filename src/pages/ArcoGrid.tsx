import React from 'react';
import { Grid } from '@arco-design/web-react';
const { Col, Row: ArcoRow } = Grid;
import './index.less';
function Row(props) {
  const { noWrap = false, children } = props;
  console.log('noWrap:', noWrap);
  return <ArcoRow className={noWrap && 'flex-no-wrap'}>{children}</ArcoRow>;
}
function ArcoGrid() {
  return (
    <Row noWrap>
      <Col flex={'auto'} style={{ marginRight: 40 }}>
        left
      </Col>
      <Col flex={'120px'}>right</Col>
    </Row>
  );
}

export default ArcoGrid;
