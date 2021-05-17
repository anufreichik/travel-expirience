import React from 'react';
import { IAttraction } from '@/pages/attraction/types';
import { List, Avatar } from 'antd';

interface IProps {
  experienceId: string;
  items: IAttraction[];
}

function ExperienceAttractionsView(props: IProps) {
  return (
    <>
      {props.items.length > 0 && (
        <List
          itemLayout="vertical"
          size="small"
          dataSource={props.items}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size={'small'} style={{ backgroundColor: '#eee7e3' }} />}
                // title={<a href="https://ant.design">{item.name}</a>}
                description={item.name.slice(0, 30)}
              />
              <div style={{ fontSize: 12 }}>{item.description.slice(0, 100)}</div>
            </List.Item>
          )}
        />
      )}
    </>
  );
}

export default ExperienceAttractionsView;
