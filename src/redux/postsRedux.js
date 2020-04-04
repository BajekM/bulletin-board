import Axios from 'axios';

/* selectors */
export const getAll = ({posts}) => posts.data;
export const getUser = ({user}) => user;
export const getLoadingActive = ({posts}) => posts.loading.active;

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
const CHANGE_PHOTO= createActionName('CHANGE_PHOTO');
const CHANGE_PRICE= createActionName('CHANGE_PRICE');
const CHANGE_PHONE = createActionName('CHANGE_PHONE');
const CHANGE_LOCATION = createActionName('CHANGE_LOCATION');

/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.posts.data.length === 0 && !state.posts.active) {
      dispatch(fetchStarted());

      Axios
        .get('http://localhost:8000/api/posts')
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }else {
      console.log('Not fetched');
    }
  };
};

export const addNew = (obj) => {
  return (dispatch, getState) => {

    Axios
      .post('http://localhost:8000/api/posts', obj)
      .then(res => {
        dispatch(addPost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });

  };
};

export const removePost = (id) => {
  return (dispatch, getState) => {

    Axios
      .delete('http://localhost:8000/api/posts/' + id)
      .then(res => {
        console.log((res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });

  };
};

export const modifyPost = (obj) => {
  return (dispatch, getState) => {

    console.log('obj', obj);

    Axios
      .put('http://localhost:8000/api/posts/' + obj._id, obj)
      .then(res => {
        console.log((res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });

  };
};

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({ payload, type: ADD_POST});
export const deletePost = payload => ({ payload, type: DELETE_POST});
export const changeTitle = payload => ({ payload, type: CHANGE_TITLE});
export const changeContent = payload => ({ payload, type: CHANGE_CONTENT});
export const changePhoto = payload => ({ payload, type: CHANGE_PHOTO});
export const changePrice = payload => ({ payload, type: CHANGE_PRICE});
export const changePhone = payload => ({ payload, type: CHANGE_PHONE});
export const changeLocation = payload => ({ payload, type: CHANGE_LOCATION});

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
        data: statePart.data.map(item => {if (item !== action.payload) return item;}),
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
    case CHANGE_PHOTO: {
      return {
        ...statePart,
        data: statePart.data.map(item => ((item.id !== action.payload.id) ? item : {...item, photo: action.payload.photo })),
      };
    }
    case CHANGE_PRICE: {
      return {
        ...statePart,
        data: statePart.data.map(item => ((item.id !== action.payload.id) ? item : {...item, content: action.payload.price })),
      };
    }
    case CHANGE_PHONE: {
      return {
        ...statePart,
        data: statePart.data.map(item => ((item.id !== action.payload.id) ? item : {...item, content: action.payload.phone })),
      };
    }
    case CHANGE_LOCATION: {
      return {
        ...statePart,
        data: statePart.data.map(item => ((item.id !== action.payload.id) ? item : {...item, content: action.payload.location })),
      };
    }
    default:
      return statePart;
  }
};
