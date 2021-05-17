import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IRestaurantStats } from '@/pages/restaurant/types';

interface IProps {
  stats: IRestaurantStats;
}

const RestaurantStats = (props: IProps) => {
  const restaurantStats = get(props, 'stats', '');

  // if (isEmpty(restaurantStats)) return null;

  const totalCount = get(restaurantStats, 'totalCount', '...');
  const totalCountDouble = get(restaurantStats, 'totalCountDouble', '...');
  const totalCountTriple = get(restaurantStats, 'totalCountTriple', '...');
  const totalCountTen = get(restaurantStats, 'totalCountTen', '...');

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

export default RestaurantStats;
