import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { SecureRoute as OktaSecureRoute } from '@okta/okta-react';

/**
 * SecureRoute Component
 * 
 * A wrapper around Okta's SecureRoute that requires authentication
 * to access. If a user is not authenticated (or hasn't completed MFA),
 * they will be redirected to Okta's login page.
 */
export const SecureRoute = ({ component: Component, ...rest }) => {
  return (
    <OktaSecureRoute
      {...rest}
      component={Component}
    />
  );
};

SecureRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string,
};

// Also export a regular public route
export const PublicRoute = Route;
