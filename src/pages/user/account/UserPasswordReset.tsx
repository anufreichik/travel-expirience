import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { connect, Link } from 'umi';

interface IProps {
  userPasswordReset: (values: any) => void;
}

const UserPasswordReset = (props: IProps) => {
  const [disableSubmit, setDisableSubmit] = useState(true);

  const onFieldsChange = (_: any, allFields: any) => {
    const hasErrors = allFields.some((el: any) => el.errors.length);
    const hasEmptyFields = allFields.some((el: any) => !el.value);
    setDisableSubmit(hasErrors || hasEmptyFields);
  };

  const onFinish = (values: any) => {
    props.userPasswordReset(values);
  };

  return (
    <Form size="large" name="user_password_reset" onFinish={onFinish} onFieldsChange={onFieldsChange}>
      <h1>Reset password</h1>
      <p>Enter your account’s email address and we will send you a link to reset your password.</p>

      <Form.Item name="email" rules={[{ type: 'email' }, { required: true, message: 'Required' }]}>
        <Input addonBefore={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" disabled={disableSubmit}>
          Send password reset link
        </Button>
      </Form.Item>

      <p>
        Remembered your password? <Link to="/user/login">Login</Link>.
      </p>
    </Form>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  userPasswordReset: (payload: any) => dispatch({ type: 'Account/passwordReset', payload }),
});

export default connect(null, mapDispatchToProps)(UserPasswordReset);
