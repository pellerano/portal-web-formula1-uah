'use client';

import React from 'react';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit/AuthProvider';

const Providers = ({ children }) => {
  const cookieDomain =
    typeof window !== 'undefined' ? window.location.hostname : '';

  const store = createStore({
    authName: '__auth',
    authType: 'cookie',
    cookieDomain,
    cookieSecure: true,
  });

  return <AuthProvider store={store}>{children}</AuthProvider>;
};

export default Providers;
