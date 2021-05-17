import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IAttractionStats } from '@/pages/attraction/types';

interface IProps {
  stats: IAttractionStats;
}

const AttractionStats = (props: IProps) => {
  const attractionStats = get(props, 'stats', '');

  // if (isEmpty(attractionStats)) return null;

  const totalCount = get(attractionStats, 'totalCount', '...');
  const totalCountDouble = get(attractionStats, 'totalCountDouble', '...');
  const totalCountTriple = get(attractionStats, 'totalCountTriple', '...');
  const totalCountTen = get(attractionStats, 'totalCountTen', '...');

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Statistic title="Total" value={totalCount} />
      </Col>

      <Col span={6}>
        <Statistic title="Trend" value={totalCountDouble} />
      </Col>

      <Col span={6}>
        <Statistic title="Users" value={totalCountTriple} />
      </Col>

      <Col span={6}>
        <Statistic title="Hits" value={totalCountTen} />
      </Col>
    </Row>
  );
};

export default AttractionStats;
