const SupportUserTypes = {
  userTypes: [
    {
      name: 'Client',
      helpWith: [
        'Getting in touch with a company owner',
        'Unfinished Work',
        'Work done poorly',
        'Payments',
        'Scheduling Problems',
        'Other',
      ],
    },
    {
      name: 'Company Owner',
      helpWith: [
        'Getting Started',
        'Clients, Vendors,Products',
        'Messaging and Calling',
        'Payments',
        'Scheduling',
        'Other',
      ],
    },
    {
      name: 'Vendor',
      helpWith: ['Getting in touch with a company owner', 'Shipping', 'Orders', 'Payments', 'Scheduling', 'Other'],
    },
    {
      name: 'User',
      helpWith: [
        'Getting Started',
        'Clients, Vendors,Products',
        'Messaging and Calling',
        'Payments',
        'Scheduling',
        'Other',
      ],
    },
    { name: 'Potential User', helpWith: ['Getting Started', 'Pricing and Bundles', 'Demo', 'Other'] },
    { name: 'Other', helpWith: ['Other'] },
  ],
};
export default SupportUserTypes;
