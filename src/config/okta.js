/**
 * Okta Authentication Configuration
 * 
 * This configuration supports MFA authentication through Okta's built-in
 * multi-factor authentication policies. MFA can be configured in your
 * Okta Admin Console under Security > Authenticators.
 */

const oktaConfig = {
  issuer: `https://${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: process.env.REACT_APP_OKTA_REDIRECT_URI || window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true, // Required for secure authentication flow
  disableHttpsCheck: process.env.NODE_ENV === 'development', // Only for local development
  
  // MFA configuration is handled server-side through Okta policies
  // Users will be prompted for MFA factors during sign-in if configured
};

export default oktaConfig;
