import React, { useState } from 'react';
import { Input, Select } from 'antd';
import codePhoneNumber from '@/utils/codePhoneNumbers';
import { get } from 'lodash';

const { Option } = Select;

const PhoneInput = (props: any) => {
  const initialPhoneCode = get(props, 'value.code', '1');
  const initialPhoneNumber = get(props, 'value.number', '');
  const initialPhoneExt = get(props, 'value.ext', '');

  const options = codePhoneNumber.map((el: string) => (
    <Option key={el} value={el} className="font-weight-bold">
      +{el}
    </Option>
  ));

  const [phoneCode, setPhoneCode] = useState<string>(initialPhoneCode);
  const [phoneNumber, setPhoneNumber] = useState<string>(initialPhoneNumber);
  const [phoneExt, setPhoneExt] = useState<string>(initialPhoneExt);

  const onChange = (field: { [key: string]: string }) => {
    if (props.onChange)
      props.onChange({
        code: phoneCode,
        number: phoneNumber,
        ext: phoneExt,
        ...field,
      });
  };

  const handleChangeCode = (code: string) => {
    setPhoneCode(code);
    onChange({ code });
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    onChange({ number: e.target.value });
  };
  const handleChangeExt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneExt(e.target.value);
    onChange({ ext: e.target.value });
  };

  return (
    <div className="d-flex">
      <div style={{ width: 90 }}>
        <Select value={phoneCode} onChange={handleChangeCode}>
          {options}
        </Select>
      </div>

      <div style={{ width: 300 }}>
        <Input placeholder="Phone Number" value={phoneNumber} onChange={handleChangeNumber} />
      </div>

      <div style={{ width: 90 }}>
        <Input placeholder="Ext" value={phoneExt} onChange={handleChangeExt} />
      </div>
    </div>
  );
};
export default PhoneInput;
