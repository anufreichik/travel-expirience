import React from 'react';
import { Avatar, List } from 'antd';
interface IProps {
  items: any[];
}
function ExperienceActivitiesView(props: IProps) {
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
                avatar={<Avatar size={'small'} style={{ backgroundColor: '#e5eee3' }} />}
                description={item.name}
              />
              <div style={{ fontSize: 12 }}>{item.description}</div>
            </List.Item>
          )}
        />
      )}
    </>
  );
}

export default ExperienceActivitiesView;
