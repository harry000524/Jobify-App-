import React, { useContext, useState, useReducer } from 'react';
import {
  CHANGE_PAGE,
  CLEAR_ALERT,
  CLEAR_FILTER,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCESS,
  DELETE_JOB_BEGIN,
  DELETE_JOB_ERROR,
  DISPLAY_ALERT,
  EDIT_JOB_BEGIN,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCESS,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  GET_JOB_BEGIN,
  GET_JOB_SUCESS,
  HANDLE_CHANGE,
  LOGOUT_USER,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  SET_EDIT_JOB,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCESS,
  TOGGLE_SIDEBAR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from './actions';
import reducer from './reducer';
import axios from 'axios';
import { useEffect } from 'react';

export const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  userLocation: '',
  jobLocation: '',
  showSideBar: false,
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  jobType: 'full-time',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobs: [],
  totalJobs: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  numOfPages: 1,
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    setTimeout(clearAlert, 3000);
  };

  const clearAlert = () => {
    dispatch({ type: CLEAR_ALERT });
  };

  const toggleSidebar = () => {
    console.log('in context');
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = async () => {
    await authFetch.get('/auth/logout');
    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });

    try {
      const { data } = await authFetch.put('/auth/updateUser', currentUser);

      const { user, location } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          user,
          location,
        },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    setTimeout(clearAlert, 3000);
  };

  const setupUser = async ({ currentUser, actionType, msg }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(
        `/api/v1/auth/${actionType}`,
        currentUser
      );
      console.log(response.data);
      const { user, location } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          location,
          msg,
        },
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    setTimeout(clearAlert, 3000);
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({
      type: CREATE_JOB_BEGIN,
    });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post('/job', {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: CREATE_JOB_SUCESS,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    setTimeout(clearAlert, 3000);
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const getJobs = async () => {
    const { search, searchStatus, searchType, sort, page } = state;

    let url = `/job?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}&limit=10`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({
      type: GET_JOB_BEGIN,
    });

    try {
      const { data } = await authFetch(url);

      const { jobs, totalJobs, numOfPages } = data;
      console.log(data);
      dispatch({
        type: GET_JOB_SUCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      // logoutUser();
    }
    setTimeout(clearAlert, 3000);
  };

  const setEditJob = (id) => {
    console.log('edit job id: ', id);
    console.log('edit state.jobs id: ', state.jobs);
    const job = state.jobs.find((job) => job._id === id);
    console.log(job);
    dispatch({
      type: SET_EDIT_JOB,
      payload: { job },
    });
  };

  const deleteJob = async (id) => {
    dispatch({
      type: DELETE_JOB_BEGIN,
    });
    try {
      await authFetch.delete(`/job/${id}`);
      getJobs();
    } catch (error) {
      // logoutUser();
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const editJob = async () => {
    dispatch({
      type: EDIT_JOB_BEGIN,
    });
    try {
      const { position, company, jobLocation, jobType, status, editJobId } =
        state;

      await authFetch.put(`/job/${editJobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });

      dispatch({
        type: EDIT_JOB_SUCESS,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    setTimeout(clearAlert, 3000);
  };

  const showStats = async () => {
    dispatch({
      type: SHOW_STATS_BEGIN,
    });
    try {
      const { data } = await authFetch('/job/stats');
      dispatch({
        type: SHOW_STATS_SUCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      // logoutUser();
    }
    setTimeout(clearAlert, 3000);
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch('/auth/getCurrentUser');
      const { user, location } = data;

      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilter,
        changePage,
        getCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
