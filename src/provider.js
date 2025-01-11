'use client';

import React from 'react';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit/AuthProvider';

const store = createStore({
  authName: '__auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: true,
});

const Providers = ({ children }) => {
  return <AuthProvider store={store}>{children}</AuthProvider>;
};

export default Providers;
