import { IExperience, IExperienceQueryParams } from '@/pages/experience/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IExperienceDeleteById {
  experienceId: string;
  queryParams: IExperienceQueryParams;
}

interface IProps {
  row: IExperience;
  open: (arg: ISidepanel) => void;
  experienceDeleteById: (arg: IExperienceDeleteById) => void;
  queryParams: IExperienceQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IExperience) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IExperience) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (experienceId: string) => {
    props.open({
      title: 'Edit Experience',
      component: 'ExperienceFormEdit',
      place: 'ExperienceDashboard',
      width: 800,
      experienceId,
    });
  };

  const deletePrompt = (experience: IExperience) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${experience.name}`,
      okType: 'danger',
      onOk: () => props.experienceDeleteById({ experienceId: experience._id, queryParams }),
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
  experienceDeleteById: (payload: IExperienceDeleteById) =>
    dispatch({ type: 'ExperienceDashboard/experienceDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
