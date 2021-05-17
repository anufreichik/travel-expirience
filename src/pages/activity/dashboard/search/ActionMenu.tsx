import { IActivity, IActivityQueryParams } from '@/pages/activity/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IActivityDeleteById {
  activityId: string;
  queryParams: IActivityQueryParams;
}

interface IProps {
  row: IActivity;
  open: (arg: ISidepanel) => void;
  activityDeleteById: (arg: IActivityDeleteById) => void;
  queryParams: IActivityQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IActivity) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IActivity) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (activityId: string) => {
    props.open({
      title: 'Edit Activity',
      component: 'ActivityFormEdit',
      place: 'ActivityDashboard',
      width: 800,
      activityId,
    });
  };

  const deletePrompt = (activity: IActivity) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${activity.name}`,
      okType: 'danger',
      onOk: () => props.activityDeleteById({ activityId: activity._id, queryParams }),
    });
  };

  return (
    <span>
      <div id="top-menu" role="menu" className="d-flex align-items-end">
        <Button type="link" onClick={() => editHandler(row._id)}>
          <EditOutlined className="edit-pen-icon" />
        </Button>

        <Dropdown overlay={menu(row)}>
          <span className="ant-dropdown-link">
            <img src={dotsIcon} alt="" height="27" />
          </span>
        </Dropdown>
      </div>
    </span>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  activityDeleteById: (payload: IActivityDeleteById) =>
    dispatch({ type: 'ActivityDashboard/activityDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
