import React from 'react';
import { get } from 'lodash';
import { Card, List, Table } from 'antd';
import { connect, Link, withRouter } from 'umi';
import { RouteComponentProps } from 'react-router-dom';

import { IExperience } from '@/pages/experience/types';
import ExperienceAttractionsView from '@/pages/experience/attraction/ExperienceAttractionsView';

interface IProps extends RouteComponentProps {
  items: IExperience[];
}

const ExperienceSearchCards = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const items = get(props, 'items', []);
  console.log(items);

  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 1, column: 3 }}
      dataSource={items}
      renderItem={(item) => (
        <List.Item>
          <Card
            title={item.name}
            extra={<Link to={`/experience/${item._id}`}>More...</Link>}
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              border: 1,
              boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
            }}
            headStyle={{
              color: 'rgb(255,255,255)',
              backgroundColor: '#4c4f35',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              border: 1,
            }}
          >
            <div className="row">
              <div className="col-md-12">
                <p>{item.description}</p>
                <ExperienceAttractionsView items={item.attractions.slice(0, 3)} experienceId={item._id} />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div>
                {' '}
                <p>{`${item.city}, ${item.country}`}</p>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

// state: any
const mapStateToProps = () => ({});

//dispatch: any
const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExperienceSearchCards));
