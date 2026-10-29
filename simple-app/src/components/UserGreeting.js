import React from 'react';
import PropTypes from 'prop-types';
import './UserGreeting.css';

/**
 * UserGreeting Component
 * Displays a personalized greeting message to the logged-in user
 * @param {Object} props - Component props
 * @param {string} props.username - The username to display
 */
const UserGreeting = ({ username }) => {
  // Get current time of day for personalized greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="user-greeting">
      <h2>{getGreeting()}, {username}!</h2>
      <p className="welcome-message">Welcome back to your dashboard</p>
    </div>
  );
};

UserGreeting.propTypes = {
  username: PropTypes.string.isRequired,
};

export default UserGreeting;
