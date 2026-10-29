import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { ProjectsProvider, SelectedProjectProvider } from './context';
import { OktaAuthProvider } from './components/auth/OktaAuth';
import { LoginCallback } from './components/auth/LoginCallback';

export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  return (
    <Router>
      <OktaAuthProvider>
        <SelectedProjectProvider>
          <ProjectsProvider>
            <main
              data-testid="application"
              className={darkMode ? 'darkmode' : undefined}
            >
              <Switch>
                <Route path="/login/callback" component={LoginCallback} />
                <Route path="/">
                  <>
                    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Content />
                  </>
                </Route>
              </Switch>
            </main>
          </ProjectsProvider>
        </SelectedProjectProvider>
      </OktaAuthProvider>
    </Router>
  );
};

App.propTypes = {
  darkModeDefault: PropTypes.bool,
};
