import React from 'react';

const AppContext = React.createContext();

export const ACTION_TYPES = {
  LOGIN: 0,
  LOGOUT: 1,

}

const DEFAULT_STATE = {
  user: {},
}

function AppReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      return { ...state, user: action.payload };
    case ACTION_TYPES.LOGOUT:
      return { ...state, user: {} };
    default:
      throw new Error("Invalid type");
  }
}

function AppProvider(props) {
  const [state, dispatch] = React.useReducer(AppReducer, DEFAULT_STATE);
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <AppContext.Provider value={value} {...props} />
}

function useApp() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a AppProvider")
  };
  const [state, dispatch] = context;
  const loginUser = data => dispatch({ type: ACTION_TYPES.LOGIN, payload: data });
  const logoutUser = () => dispatch({ type: ACTION_TYPES.LOGOUT });
  return {
    state, dispatch, loginUser, logoutUser
  }
}

export { AppProvider, useApp };
