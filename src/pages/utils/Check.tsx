import React from 'react';
import successIcon from '@/icons/checked.svg';
import successInactiveIcon from '@/icons/checkedInactive.svg';

const Check = ({ checked }: { checked: boolean }) => {
  return checked ? <img src={successIcon} alt="" height="27" /> : <img src={successInactiveIcon} alt="" height="27" />;
};

export default Check;
