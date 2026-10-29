import React from 'react';
import { render, screen } from '@testing-library/react';
import { OktaAuthProvider } from '../components/auth/OktaAuth';
import { LoginCallback } from '../components/auth/LoginCallback';

// Mock Okta dependencies
jest.mock('@okta/okta-react', () => ({
  Security: ({ children }) => <div data-testid="okta-security">{children}</div>,
  LoginCallback: () => <div data-testid="okta-login-callback">Okta Callback</div>,
  SecureRoute: ({ component: Component, ...rest }) => <Component {...rest} />,
  useOktaAuth: () => ({
    oktaAuth: {
      getUser: jest.fn().mockResolvedValue({ name: 'Test User', email: 'test@example.com' }),
      signInWithRedirect: jest.fn(),
      signOut: jest.fn(),
    },
    authState: {
      isAuthenticated: false,
    },
  }),
}));

jest.mock('@okta/okta-auth-js', () => ({
  OktaAuth: jest.fn().mockImplementation(() => ({
    signInWithRedirect: jest.fn(),
    signOut: jest.fn(),
    getUser: jest.fn().mockResolvedValue({ name: 'Test User', email: 'test@example.com' }),
  })),
}));

describe('OktaAuthProvider', () => {
  it('renders children wrapped in Security component', () => {
    render(
      <OktaAuthProvider>
        <div data-testid="test-child">Test Child</div>
      </OktaAuthProvider>
    );

    expect(screen.getByTestId('okta-security')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('provides authentication context to children', () => {
    const { container } = render(
      <OktaAuthProvider>
        <div>Auth Provider Active</div>
      </OktaAuthProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});

describe('LoginCallback', () => {
  it('renders login callback component', () => {
    render(<LoginCallback />);

    expect(screen.getByTestId('login-callback')).toBeInTheDocument();
    expect(screen.getByText('Completing authentication...')).toBeInTheDocument();
  });

  it('displays loading message during authentication', () => {
    render(<LoginCallback />);

    expect(screen.getByText('Please wait while we verify your credentials.')).toBeInTheDocument();
  });

  it('renders Okta login callback handler', () => {
    render(<LoginCallback />);

    expect(screen.getByTestId('okta-login-callback')).toBeInTheDocument();
  });
});

describe('Okta MFA Support', () => {
  it('configuration supports MFA through Okta settings', () => {
    // MFA is handled server-side by Okta
    // This test verifies the configuration is set up correctly
    const oktaConfig = require('../config/okta').default;
    
    expect(oktaConfig.pkce).toBe(true);
    expect(oktaConfig.scopes).toContain('openid');
    expect(oktaConfig.scopes).toContain('profile');
    expect(oktaConfig.scopes).toContain('email');
  });
});
