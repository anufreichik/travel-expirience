import React from 'react';
import ClientMessagesMenu from '../pages/client/messages/ClientMessagesMenu';

const ClientMessagesLayout = ({ children }: any) => {
  return (
    <div className="row">
      <div className="col-md-3">
        <ClientMessagesMenu />
      </div>

      <div className="col-md-9">{children}</div>
    </div>
  );
};

export default ClientMessagesLayout;
