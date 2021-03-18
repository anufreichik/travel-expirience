import React from 'react';
import { connect, Link } from 'umi';
import img1 from '@/pages/pages/homePage/images/homePageIllustration1.png';
import img2 from '@/pages/pages/homePage/images/homePageIllustration2.png';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  Account: IUserAccount;
}

function HomePage(props: IProps) {
  const isUserAuth = get(props, 'Account._id');

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-lg-6">
          <img src={img1} className="align-content-center w-100" alt="ClientBase" title="ClientBase" />
        </div>

        <div className="col-lg-6">
          <h1 className="mb-4">ERP for small business</h1>

          <p>
            ClientBase is ready to go, accessible from anywhere, easy to use and offers great value to any kind of small
            business.
          </p>

          <p className="mt-4">
            Stop juggling multiple tools. With ClientBase you can manage clientele, accounting and communication - in a
            single solution.
          </p>

          {!isUserAuth && (
            <div className="mt-5">
              <Link className="ant-btn ant-btn-primary login-form-button" to="/user/register">
                Sign up for free
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="row mt-5">
          <div className="col-lg-7">
            <div className="mt-5 mb-5">
              <h3>Clients</h3>
              <p>Organize your client and vendor lists and keep a single accurate version for each contact.</p>
            </div>

            <div className="mt-5 mb-5">
              <h3>Estimates, Invoices, Payments</h3>
              <p>
                No more wasting your time filling out the same information. Turn estimates into invoices, invoices into
                payments with a click of a button. Create more revenue by working efficiently.
              </p>
            </div>

            <div className="mt-5 mb-5">
              <h3>Calls and Messages</h3>
              <p>
                Messages and calls between your team and the client are logged in an integrated chat, so everyone is
                instantly updated. No miscommunication, no extra phone calls.
              </p>
            </div>

            <div className="mt-5 mb-5">
              <h3>Schedule Tasks</h3>
              <p>Make scheduling a breeze, never miss a meeting.</p>
            </div>

            {!isUserAuth && (
              <div className="mt-4 mb-5">
                <Link className="ant-btn ant-btn-primary login-form-button" to="/user/register">
                  Start today
                </Link>
              </div>
            )}
          </div>

          <div className="col-lg-5">
            <img src={img2} className="align-content-center w-100" alt="ClientBase " title="ClientBase " />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default connect(mapStateToProps)(HomePage);
