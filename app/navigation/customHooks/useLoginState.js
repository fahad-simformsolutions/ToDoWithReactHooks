import {useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const actionTypes = Object.freeze({
  login: 'LOGIN',
  logout: 'LOGOUT',
  restoreToken: 'RESTORE_TOKEN',
});

const initialLoginState = {
  isLoading: true,
  isLogout: true,
  username: null,
};

function loginReducer(state, action) {
  switch (action.type) {
    case actionTypes.login:
      return {...state, isLogout: false, username: action.name};
    case actionTypes.logout:
      return {...state, isLogout: true, username: null};
    case actionTypes.restoreToken:
      return {
        ...state,
        isLoading: false,
        isLogout: !action.name,
        username: action.name,
      };
  }
}

function useLoginState() {
  const [state, dispatch] = useReducer(loginReducer, initialLoginState);

  useEffect(() => {
    const getUserFromAsyncStore = async () => {
      try {
        const name = await AsyncStorage.getItem('@username');
        dispatch({type: actionTypes.restoreToken, name});
      } catch (e) {
        console.warn(e?.message ?? e);
      }
    };

    getUserFromAsyncStore();
  }, []);

  return {
    ...state,
    loginActions: {
      login: async (name) => {
        try {
          await AsyncStorage.setItem('@username', name);
          dispatch({type: actionTypes.login, name});
        } catch (e) {
          console.warn(e?.message ?? e);
        }
      },
      logout: async () => {
        try {
          await AsyncStorage.removeItem('@username');
          dispatch({type: actionTypes.logout});
        } catch (e) {
          console.warn(e?.message ?? e);
        }
      },
    },
  };
}

export default useLoginState;
