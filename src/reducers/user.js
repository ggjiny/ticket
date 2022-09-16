export const initialState = {
  userData: null,
};

// action creator
export const loginAction = data => {
  return {
    type: 'LOG_IN',
    data,
  };
};

export const logoutAction = () => {
  return {
    type: 'LOG_OUT',
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        userData: action.data,
      };
    case 'LOG_OUT':
      return {
        ...state,
        userData: null,
      };
    default:
      return state;
  }
};

export default reducer;