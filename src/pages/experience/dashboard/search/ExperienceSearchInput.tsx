import React from 'react';
import { Button, Form, Input } from 'antd';
import { IExperienceQueryParams } from '@/pages/experience/types';

interface IProps {
  onChange: (values: null | IExperienceQueryParams) => void;
}

function ExperienceSearchInput(props: IProps) {
  const [form] = Form.useForm();
  const formValues = form.getFieldsValue();

  return (
    <Form size="large" form={form} onFinish={props.onChange}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Form.Item name="name">
              <Input placeholder="Search Experience" style={{ width: 600, height: 60 }} />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 pe-0">
            <Form.Item name="city">
              <Input placeholder="City" style={{ height: 60 }} />
            </Form.Item>
          </div>
          <div className="col-md-5 pe-0">
            <Form.Item name="country">
              <Input placeholder="Country" style={{ height: 60 }} />
            </Form.Item>
          </div>
          <div className="col-md-2">
            <Form.Item>
              <Button size="large" htmlType="submit" style={{ height: 60, color: '#fff', backgroundColor: '#4c4f35' }}>
                Submit
              </Button>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default ExperienceSearchInput;
