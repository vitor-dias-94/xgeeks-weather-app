import {
  SET_USER_LOCATION,
  SET_ERROR
} from './action-types';

const initialState = {
  userLocation: null,
  errorMessage: ''
};

const App = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOCATION: {
      return {
        ...state,
        userLocation: action.payload 
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        errorMessage: action.payload 
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default App;