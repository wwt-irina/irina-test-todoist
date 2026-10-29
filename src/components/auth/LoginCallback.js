import React from 'react';
import { LoginCallback as OktaLoginCallback } from '@okta/okta-react';

/**
 * LoginCallback Component
 * 
 * Handles the redirect callback from Okta after authentication.
 * This includes handling MFA completion and token exchange.
 * Users are redirected here after successful authentication (including MFA).
 */
export const LoginCallback = () => {
  return (
    <div className="login-callback" data-testid="login-callback">
      <div className="loading-container">
        <p>Completing authentication...</p>
        <p>Please wait while we verify your credentials.</p>
      </div>
      <OktaLoginCallback />
    </div>
  );
};
