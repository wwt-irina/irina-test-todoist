import React from 'react';
import PropTypes from 'prop-types';
import { Security } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import oktaConfig from '../../config/okta';

/**
 * OktaAuthProvider Component
 * 
 * Wraps the application with Okta's Security component to enable
 * authentication throughout the app. Supports MFA authentication
 * which is configured in Okta Admin Console.
 */
export const OktaAuthProvider = ({ children }) => {
  const oktaAuth = new OktaAuth(oktaConfig);

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    window.location.replace(originalUri || '/');
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {children}
    </Security>
  );
};

OktaAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
