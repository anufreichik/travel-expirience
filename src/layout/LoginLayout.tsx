import React from 'react';
import { Link } from 'umi';
import { Col, Row } from 'antd';

interface IProps {
  children: any;
}

export default ({ children }: IProps) => {
  return (
    <>
      <Row align="middle">
        <Link to="/" className="site-name">
          ClientBase
        </Link>
      </Row>

      <Row justify="center" className="mt-3rem ">
        <Col xs={20} sm={20} md={12} lg={8}>
          {children}
        </Col>
      </Row>
    </>
  );
};
