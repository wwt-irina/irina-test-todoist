# Okta Authentication Setup

This application uses Okta for authentication with Multi-Factor Authentication (MFA) support.

## Features

- Secure authentication using Okta
- Multi-Factor Authentication (MFA) support
- Protected routes for authenticated users
- User profile information access
- Login/Logout functionality

## Configuration

### 1. Set up Okta Application

1. Log in to your Okta Admin Console
2. Navigate to Applications > Applications
3. Click "Create App Integration"
4. Choose "OIDC - OpenID Connect" and "Single-Page Application"
5. Configure the following settings:
   - **Sign-in redirect URIs**: `http://localhost:3000/login/callback`
   - **Sign-out redirect URIs**: `http://localhost:3000`
   - **Grant types**: Authorization Code, Refresh Token
   - Enable "Allow everyone in your organization to access"

### 2. Configure MFA

1. In Okta Admin Console, go to Security > Authenticators
2. Add and configure authenticators:
   - **Okta Verify**: Push notifications and TOTP
   - **Google Authenticator**: TOTP
   - **SMS Authentication**: Text message codes
   - **Email Authentication**: Email codes
3. Set up authentication policies:
   - Go to Security > Authentication Policies
   - Create or edit a policy
   - Add a rule requiring MFA for sign-on

### 3. Environment Variables

Update the `.env` file with your Okta application details:

```env
REACT_APP_OKTA_DOMAIN=your-okta-domain.okta.com
REACT_APP_OKTA_CLIENT_ID=your-client-id
REACT_APP_OKTA_REDIRECT_URI=http://localhost:3000/login/callback
```

### 4. Install Dependencies

```bash
npm install --legacy-peer-deps
```

## Usage

### Using the useAuth Hook

```javascript
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { isAuthenticated, user, login, logout, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
```

### Protected Routes

```javascript
import { SecureRoute } from './components/auth';

<SecureRoute path="/protected" component={ProtectedComponent} />
```

## MFA Flow

1. User clicks "Login" button
2. Redirected to Okta login page
3. User enters username and password
4. If MFA is enabled, user is prompted to:
   - Enter TOTP code from authenticator app
   - Approve push notification on mobile device
   - Enter SMS code
   - Enter email code
5. After successful authentication (including MFA), user is redirected back to the app
6. User's session is maintained with refresh tokens

## Components

### OktaAuthProvider
Wraps the application with Okta's Security component.

### LoginCallback
Handles the redirect callback after Okta authentication.

### SecureRoute
Protects routes requiring authentication.

### useAuth Hook
Provides authentication state and methods.

## Testing

Run tests with:
```bash
npm test
```

The test suite includes:
- OktaAuthProvider component tests
- LoginCallback component tests
- MFA configuration verification

## Security Notes

- MFA is configured and enforced through Okta Admin Console
- PKCE (Proof Key for Code Exchange) is enabled for enhanced security
- Tokens are securely stored and managed by Okta SDK
- Never commit actual Okta credentials to version control
