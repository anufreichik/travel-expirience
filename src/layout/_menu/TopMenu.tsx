import React from 'react';
import { connect, Link, withRouter } from 'umi';
import { get } from 'lodash';
import classNames from 'classnames';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  Account: IUserAccount;
}

const TopMenu = (props: IProps) => {
  const location = get(props, 'location.pathname', '');
  const acl = get(props, 'Account.acl', []);

  const mainMenu = [
    { path: '/base', name: 'Base', perm: 'base.get.own' },
    { path: '/client', name: 'Clients', perm: 'client.get.own' },
    { path: '/order', name: 'Orders', perm: 'order.get.own' },
    { path: '/vendor', name: 'Vendors', perm: 'vendor.get.own' },
    { path: '/service', name: 'Services', perm: 'service.get.own' },
  ]
    .map((el) => ({
    ...el,
    isActive: location.startsWith(el.path),
    isVisible: acl.includes(el.perm),
  }));

  return (
    <div id="top-menu" role="menu" className="d-flex d-print-none">
      {mainMenu.map(
        (el) =>
          el.isVisible && (
            <div className={classNames('item', { active: el.isActive })} key={el.path}>
              <Link to={el.path}>{el.name}</Link>
            </div>
          ),
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default withRouter(connect(mapStateToProps)(TopMenu));
