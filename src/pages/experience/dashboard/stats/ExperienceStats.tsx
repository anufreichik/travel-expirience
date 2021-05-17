import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IExperienceStats } from '@/pages/experience/types';

interface IProps {
  stats: IExperienceStats;
}

const ExperienceStats = (props: IProps) => {
  const experienceStats = get(props, 'stats', '');

  // if (isEmpty(experienceStats)) return null;

  const totalCount = get(experienceStats, 'totalCount', '...');
  const totalCountDouble = get(experienceStats, 'totalCountDouble', '...');
  const totalCountTriple = get(experienceStats, 'totalCountTriple', '...');
  const totalCountTen = get(experienceStats, 'totalCountTen', '...');

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

export default ExperienceStats;
