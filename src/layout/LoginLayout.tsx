import React from 'react';
import { Link } from 'umi';
import { Col, Row } from 'antd';

interface IProps {
  children: any;
}

export default ({ children }: IProps) => {
  return (
    <div className="container">
      <div className="row">
        <Link to="/" className="navbar-brand">
          TRAVELEKS
        </Link>
      </div>

      <div className="row mt-5">
        <div className="col-lg-5 col-md-5 col-sm-12 mx-auto">{children}</div>
      </div>
    </div>
  );
};
