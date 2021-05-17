import { IAttraction, IAttractionQueryParams } from '@/pages/attraction/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IAttractionDeleteById {
  attractionId: string;
  queryParams: IAttractionQueryParams;
}

interface IProps {
  row: IAttraction;
  open: (arg: ISidepanel) => void;
  attractionDeleteById: (arg: IAttractionDeleteById) => void;
  queryParams: IAttractionQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IAttraction) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IAttraction) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (attractionId: string) => {
    props.open({
      title: 'Edit Attraction',
      component: 'AttractionFormEdit',
      place: 'AttractionDashboard',
      width: 800,
      attractionId,
    });
  };

  const deletePrompt = (attraction: IAttraction) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${attraction.name}`,
      okType: 'danger',
      onOk: () => props.attractionDeleteById({ attractionId: attraction._id, queryParams }),
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
  attractionDeleteById: (payload: IAttractionDeleteById) =>
    dispatch({ type: 'AttractionDashboard/attractionDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
