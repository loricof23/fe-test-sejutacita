import api from "../apis/api";


/**
 * Call API and get categories data and set the data to the reducer
 * @returns 
 */
export const getDataCategory = () => async dispatch => {
  const response = await api.get('/fee-assessment-categories');

  dispatch({type: 'GET_CATEGORY', payload: response.data});
}

/**
 * Call API to get the books by the given category Id
 * @param {*} categoryId 
 * @returns 
 */
export const getDataBook = (categoryId = 1) => async (dispatch) => {
  dispatch({ type: 'TOGGLE_LOADING' });

  await dispatch({ type: 'SET_CATEGORY', payload: categoryId });

  try {
    // success
    const response = await api.get('/fee-assessment-books', {
      params: {
        categoryId,
        page: 0,
        size: 10,
      }
    });

    dispatch({type: 'GET_BOOK', payload: response});
    dispatch({type: 'GET_BOOKPOOL', payload: response });

  } catch (e) {
    // failed call API status not 200
    const response = e.response;
    dispatch({type: 'GET_BOOK', payload: response});
  }

  dispatch({type: 'TOGGLE_LOADING'});
}

/**
 * Get the books data from the next page
 * @returns 
 */
export const getNextPageBooks = () => async (dispatch, getState) => {
  dispatch({ type: 'TOGGLE_LOADING' });

  await dispatch({ type: 'NEXT_PAGE' });

  const { activeCategory, page } = getState();

  try {
    // success
    const response = await api.get('/fee-assessment-books', {
      params: {
        page,
        categoryId: activeCategory,
        size: 10,
      }
    });

    const bookPoolAddition = {
      status: 200,
      data: response.data.slice(0, 2),
    }

    dispatch({type: 'GET_BOOK', payload: response});
    dispatch({type: 'GET_BOOKPOOL', payload: bookPoolAddition});
  } catch (e) {
    // failed call API status not 200
    const response = e.response;
    dispatch({type: 'GET_BOOK', payload: response});
  }

  dispatch({type: 'TOGGLE_LOADING'});
}

/**
 * Get the books data from the previous page
 * @returns 
 */
export const getPrevPageBooks = () => async (dispatch, getState) => {
  dispatch({ type: 'TOGGLE_LOADING' });

  await dispatch({ type: 'PREV_PAGE' });

  const { page, activeCategory } = getState();

  try {
    // success
    const response = await api.get('/fee-assessment-books', {
      params: {
        page,
        categoryId: activeCategory,
        size: 10,
      }
    });

    dispatch({type: 'GET_BOOK', payload: response});
  } catch (e) {
    // failed call API status not 200
    const response = e.response;
    dispatch({type: 'GET_BOOK', payload: response});
  }

  dispatch({type: 'TOGGLE_LOADING'});
}

/**
 * Filters data from the bookpool reducer, and filters it using the event value
 * @param e 
 * @returns 
 */
export const searchBook = (e) => async (dispatch, getState) => {
  const query = e.target.value;

  if (query === '') {
    return dispatch(getDataBook());
  }

  const { bookPool } = getState();

  const output = [];

  bookPool.data.forEach(element => {
    console.log(element);
    if (element.title.toLowerCase().includes(query.toLowerCase())) {
      output.push(element);
    }
  });

  const sanitizedOutput = {
    status: 200,
    data: output,
  }

  dispatch({type: 'GET_BOOK', payload: sanitizedOutput});
}

/**
 * Get data from book pool and filter it and find which are bookmarked
 * @returns 
 */
export const getDataBookmark = () => async (dispatch, getState) => {
  dispatch({ type: 'TOGGLE_LOADING' });

  const { bookPool } = getState();

  try {
    const output = [];
    const bookemarkedBookIds = JSON.parse(localStorage.getItem('bookmarkedBooks'));

    bookPool.data.forEach((book) => {
      if (bookemarkedBookIds.includes(book.id)) {
        output.push(book);
      }
    });

    const sanitizedOutput = {
      status: 200,
      data: output,
    }

    dispatch({type: 'GET_BOOK', payload: sanitizedOutput});
  } catch (e) {
    // failed call API status not 200
    const response = e.response;
    dispatch({type: 'GET_BOOK', payload: response});
  }

  dispatch({type: 'TOGGLE_LOADING'});
}