import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>403 - Access Denied</h1>
        <p style={styles.message}>You don't have permission to view this page.</p>
        <div style={styles.icon}>
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF3D57" strokeWidth="2"/>
            <path d="M12 8V12" stroke="#FF3D57" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 16H12.01" stroke="#FF3D57" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <Link to="/" style={styles.button}>
          Return to Home
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    paddingTop: '10px', // Matches navbar height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent' // No grey background
  },
  content: {
    textAlign: 'center',
    width: '90%',
    maxWidth: '500px',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    margin: '20px 0'
  },
  title: {
    fontSize: '2rem',
    color: '#2d3748',
    marginBottom: '16px'
  },
  message: {
    fontSize: '1.1rem',
    color: '#4a5568',
    marginBottom: '24px'
  },
  icon: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#4299e1',
    color: 'white',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  }
};

export default UnauthorizedPage;