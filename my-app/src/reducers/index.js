import { combineReducers } from "redux";

const categoryReducers = (state = [], action) => {
  if (action.type === 'GET_CATEGORY'){
    return action.payload;
  }

  return state;
}

const bookReducers = (state = [], action) => {
  if (action.type === 'GET_BOOK'){
    return action.payload;
  }

  return state;
}

const bookPoolReducers = (state = [],action) => {
  if (action.type === 'GET_BOOKPOOL'){
    return {...state, ...action.payload};
  }

  return state;
} 

const pageReducers = (state = 0, action) => {
  switch (action.type) {
    case "NEXT_PAGE":
      return state + 1;

    case "PREV_PAGE":
      return state - 1;

    case "SET_PAGE":
      return action.payload;

    default:
      return state;
  }
}

const activeCategoryReducers = (state = 0, action) => {
  if (action.type === "SET_CATEGORY"){
    return action.payload;
  }
  return state;
}

const isLoadingReducers = (state = false, action) => {
  if (action.type === "TOGGLE_LOADING"){
    return !state;
  }

  return state;
}

export default combineReducers({
  categoryRed : categoryReducers, // categories
  bookRed: bookReducers, // books from x page
  bookPool: bookPoolReducers, // all books retrieved from the page before
  page: pageReducers, // active page 
  activeCategory: activeCategoryReducers, // active category
  isLoading: isLoadingReducers // determine to show the loading
});