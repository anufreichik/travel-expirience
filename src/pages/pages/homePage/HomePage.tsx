import React from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';
import ExperienceDashboardPublic from '@/pages/experience/dashboard/ExperienceDashboardPublic';
import ExperienceSearchInput from '@/pages/experience/dashboard/search/ExperienceSearchInput';

interface IProps {
  Account: IUserAccount;
}

function HomePage(props: IProps) {
  const isUserAuth = get(props, 'Account._id');
  const landingImage = require('../homePage/images/schoolhouse-vineyards.png');
  return (
    <div className="container mb-5">
      <img className="home_image" src={landingImage} alt="" />

      <div className="row mt-3">
        <div className="col-lg-12">
          <ExperienceDashboardPublic />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default connect(mapStateToProps)(HomePage);
