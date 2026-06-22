const initialState = {
  books: [],
  page: 1,
  total: 1,
  totalPages: 1,
  allCategories: [],
  allAuthors: [],
  loading: false,
  error: null,
};

const bookReducer = (state, action) => {
  switch (action.type) {
    case "data_fetching": {
      return {
        ...state,
        loading: true,
      };
    }
    case "data_fetched": {
      return {
        ...state,
        books: action.data.books,
        page: action.data.page,
        total: action.data.total,
        totalPages: action.data.totalPages,
        allCategories: action.data.allCategories || state.allCategories,
        allAuthors: action.data.allAuthors || state.allAuthors,
        loading: false,
      };
    }
    case "data_fetch_error": {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
};

export { bookReducer, initialState };
