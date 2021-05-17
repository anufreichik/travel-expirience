import { IRestaurant, IRestaurantQueryParams } from '@/pages/restaurant/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IRestaurantDeleteById {
  restaurantId: string;
  queryParams: IRestaurantQueryParams;
}

interface IProps {
  row: IRestaurant;
  open: (arg: ISidepanel) => void;
  restaurantDeleteById: (arg: IRestaurantDeleteById) => void;
  queryParams: IRestaurantQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IRestaurant) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IRestaurant) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (restaurantId: string) => {
    props.open({
      title: 'Edit Restaurant',
      component: 'RestaurantFormEdit',
      place: 'RestaurantDashboard',
      width: 800,
      restaurantId,
    });
  };

  const deletePrompt = (restaurant: IRestaurant) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${restaurant.name}`,
      okType: 'danger',
      onOk: () => props.restaurantDeleteById({ restaurantId: restaurant._id, queryParams }),
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
  restaurantDeleteById: (payload: IRestaurantDeleteById) =>
    dispatch({ type: 'RestaurantDashboard/restaurantDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
