/* selectors */
export const getAll = ({posts}) => posts.data;
export const getUser = ({user}) => user;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const DELETE_POST = createActionName('DELETE_POST');
const CHANGE_TITLE = createActionName('CHANGE_TITLE');
const CHANGE_CONTENT = createActionName('CHANGE_CONTENT');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({ payload, type: ADD_POST});
export const deletePost = payload => ({ payload, type: DELETE_POST});
export const changeTitle = payload => ({ payload, type: CHANGE_TITLE});
export const changeContent = payload => ({ payload, type: CHANGE_CONTENT});

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    }
    case DELETE_POST: {
      return {
        ...statePart,
        data: statePart.data.map(item => ((item.id !== action.payload.id) ? item : console.log('Deleted'))),
      };
    }
    case CHANGE_TITLE: {
      return {
        ...statePart,
        data: statePart.data.map(item => ((item.id !== action.payload.id) ? item : {...item, title: action.payload.title })),
      };
    }
    case CHANGE_CONTENT: {
      return {
        ...statePart,
        data: statePart.data.map(item => ((item.id !== action.payload.id) ? item : {...item, content: action.payload.content })),
      };
    }
    default:
      return statePart;
  }
};
