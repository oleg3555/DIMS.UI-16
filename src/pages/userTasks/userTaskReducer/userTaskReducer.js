import { SET_TASKS, UPDATE_STATUS } from './type-constants';

export const userTaskReducer = (state, action) => {
  switch (action.type) {
    case SET_TASKS: {
      return action.payload.tasks;
    }
    case UPDATE_STATUS: {
      return state.map((task) => (task.id === action.payload.id ? { ...task, status: action.payload.value } : task));
    }
    default: {
      return state;
    }
  }
};

export const setTasksAction = (tasks) => ({ type: SET_TASKS, payload: { tasks } });
export const updateTaskStatusAction = (id, value) => ({ type: UPDATE_STATUS, payload: { id, value } });