import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IActivityStats } from '@/pages/activity/types';

interface IProps {
  stats: IActivityStats;
}

const ActivityStats = (props: IProps) => {
  const activityStats = get(props, 'stats', '');

  // if (isEmpty(activityStats)) return null;

  const totalCount = get(activityStats, 'totalCount', '...');
  const totalCountDouble = get(activityStats, 'totalCountDouble', '...');
  const totalCountTriple = get(activityStats, 'totalCountTriple', '...');
  const totalCountTen = get(activityStats, 'totalCountTen', '...');

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

export default ActivityStats;
