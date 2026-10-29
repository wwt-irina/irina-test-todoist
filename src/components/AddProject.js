import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../firebase';
import { generatePushId } from '../helpers';
import { useProjectsValue } from '../context';

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState('');

  const projectId = generatePushId();
  const { projects, setProjects } = useProjectsValue();

  /**
   * Adds a new project to the Firestore database with input validation
   * @returns {Promise<void>} Promise that resolves when project is added
   */
  const addProject = () => {
    // Validate that project name is not empty
    // Project name must be a non-empty string after trimming whitespace
    if (!projectName || typeof projectName !== 'string' || projectName.trim().length === 0) {
      console.error('Project name is required and must be a non-empty string');
      return Promise.reject(new Error('Invalid project name'));
    }

    // Validate project name length (min 1, max 100 characters)
    // Prevents excessively long or empty project names
    const trimmedName = projectName.trim();
    if (trimmedName.length < 1) {
      console.error('Project name must be at least 1 character long');
      return Promise.reject(new Error('Project name too short'));
    }
    if (trimmedName.length > 100) {
      console.error('Project name must not exceed 100 characters');
      return Promise.reject(new Error('Project name too long'));
    }

    // Validate project name doesn't contain only special characters
    // Ensures meaningful project names
    const hasAlphanumeric = /[a-zA-Z0-9]/.test(trimmedName);
    if (!hasAlphanumeric) {
      console.error('Project name must contain at least one alphanumeric character');
      return Promise.reject(new Error('Invalid project name format'));
    }

    // Validate that projectId is generated properly
    // Project ID is required for database operations
    if (!projectId || typeof projectId !== 'string') {
      console.error('Project ID generation failed');
      return Promise.reject(new Error('Invalid project ID'));
    }

    // Validate userId exists (hardcoded in this implementation)
    // In a production app, this should come from authentication
    const userId = 'jlIFXIwyAL3tzHMtzRbw';
    if (!userId || typeof userId !== 'string') {
      console.error('User ID is required');
      return Promise.reject(new Error('Invalid user ID'));
    }

    // Check for duplicate project names (case-insensitive)
    // Prevents confusion with similarly named projects
    const duplicateExists = projects.some(
      (p) => p.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (duplicateExists) {
      console.error('A project with this name already exists');
      return Promise.reject(new Error('Duplicate project name'));
    }

    // Add the project to Firestore with validated data
    return firebase
      .firestore()
      .collection('projects')
      .add({
        projectId,
        name: trimmedName, // Use trimmed project name
        userId,
      })
      .then(() => {
        // Refresh projects list after successful submission
        setProjects([...projects]);
        // Reset form fields
        setProjectName('');
        setShow(false);
      })
      .catch((error) => {
        // Log Firebase errors for debugging
        console.error('Error adding project to Firestore:', error);
        throw error;
      });
  };

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input" data-testid="add-project-inner">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project__name"
            data-testid="project-name"
            type="text"
            placeholder="Name your project"
            maxLength={100}
          />
          <button
            className="add-project__submit"
            type="button"
            onClick={() => addProject()}
            data-testid="add-project-submit"
          >
            Add Project
          </button>
          <span
            aria-label="Cancel adding project"
            data-testid="hide-project-overlay"
            className="add-project__cancel"
            onClick={() => setShow(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setShow(false);
            }}
            role="button"
            tabIndex={0}
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      <span
        aria-label="Add Project"
        data-testid="add-project-action"
        className="add-project__text"
        onClick={() => setShow(!show)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShow(!show);
        }}
        role="button"
        tabIndex={0}
      >
        Add Project
      </span>
    </div>
  );
};

AddProject.propTypes = {
  shouldShow: PropTypes.bool,
};
