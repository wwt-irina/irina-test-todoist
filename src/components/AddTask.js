import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import PropTypes from 'prop-types';
import { firebase } from '../firebase';
import { useSelectedProjectValue } from '../context';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';

export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { selectedProject } = useSelectedProjectValue();

  /**
   * Adds a new task to the Firestore database with input validation
   * @returns {Promise<void>} Promise that resolves when task is added
   */
  const addTask = () => {
    // Validate that task content is not empty
    // Task must be a non-empty string after trimming whitespace
    if (!task || typeof task !== 'string' || task.trim().length === 0) {
      console.error('Task content is required and must be a non-empty string');
      return Promise.reject(new Error('Invalid task content'));
    }

    // Validate task length (max 500 characters)
    // Prevents excessively long task descriptions
    if (task.trim().length > 500) {
      console.error('Task content must not exceed 500 characters');
      return Promise.reject(new Error('Task content too long'));
    }

    // Get the project ID from either the project selector or selected project
    // Ensures a project is always associated with the task
    const projectId = project || selectedProject;
    
    // Validate that projectId exists
    // Every task must be associated with a project
    if (!projectId || typeof projectId !== 'string' || projectId.trim().length === 0) {
      console.error('Project ID is required');
      return Promise.reject(new Error('Invalid project ID'));
    }

    let collatedDate = '';

    // Handle special project types with predefined dates
    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
    }

    // Validate date format if provided
    // Date should be in DD/MM/YYYY format or empty string
    const finalDate = collatedDate || taskDate;
    if (finalDate && !moment(finalDate, 'DD/MM/YYYY', true).isValid()) {
      console.error('Date must be in DD/MM/YYYY format');
      return Promise.reject(new Error('Invalid date format'));
    }

    // Validate userId exists (hardcoded in this implementation)
    // In a production app, this should come from authentication
    const userId = 'jlIFXIwyAL3tzHMtzRbw';
    if (!userId || typeof userId !== 'string') {
      console.error('User ID is required');
      return Promise.reject(new Error('Invalid user ID'));
    }

    // Add the task to Firestore with validated data
    return firebase
      .firestore()
      .collection('tasks')
      .add({
        archived: false, // New tasks are not archived by default
        projectId: projectId.trim(),
        task: task.trim(), // Trim whitespace from task content
        date: finalDate,
        userId,
      })
      .then(() => {
        // Reset form fields after successful submission
        setTask('');
        setProject('');
        setShowMain('');
        setShowProjectOverlay(false);
      })
      .catch((error) => {
        // Log Firebase errors for debugging
        console.error('Error adding task to Firestore:', error);
        throw error;
      });
  };

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && (
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          onClick={() => setShowMain(!showMain)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setShowMain(!showMain);
          }}
          tabIndex={0}
          aria-label="Add task"
          role="button"
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddTask && (
            <>
              <div data-testid="quick-add-task">
                <h2 className="header">Quick Add Task</h2>
                <span
                  className="add-task__cancel-x"
                  data-testid="add-task-quick-cancel"
                  aria-label="Cancel adding task"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setShowMain(false);
                      setShowProjectOverlay(false);
                      setShowQuickAddTask(false);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                >
                  X
                </span>
              </div>
            </>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            className="add-task__content"
            aria-label="Enter your task"
            data-testid="add-task-content"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type="button"
            className="add-task__submit"
            data-testid="add-task"
            onClick={() =>
              showQuickAddTask
                ? addTask() && setShowQuickAddTask(false)
                : addTask()
            }
          >
            Add Task
          </button>
          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              data-testid="add-task-main-cancel"
              onClick={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setShowMain(false);
                  setShowProjectOverlay(false);
                }
              }}
              aria-label="Cancel adding a task"
              tabIndex={0}
              role="button"
            >
              Cancel
            </span>
          )}
          <span
            className="add-task__project"
            data-testid="show-project-overlay"
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setShowProjectOverlay(!showProjectOverlay);
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            data-testid="show-task-date-overlay"
            onClick={() => setShowTaskDate(!showTaskDate)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setShowTaskDate(!showTaskDate);
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};

AddTask.propTypes = {
  showAddTaskMain: PropTypes.bool,
  shouldShowMain: PropTypes.bool,
  showQuickAddTask: PropTypes.bool,
  setShowQuickAddTask: PropTypes.func,
};
