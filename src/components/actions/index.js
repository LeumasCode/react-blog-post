import jsonPlaceholder from "../../apis/jsonPlaceholder";

// GET ALL THE POST
export const fetchPosts = () => {
  return async (dispatch) => {
    const response = await jsonPlaceholder.get("/posts");

    dispatch({ type: "FETCH_POSTS", payload: response.data });
  };
};

//GET A SINGLE USER
export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};


// 1) FETCH THE POST 
// 2) GET THE CURRENT STATE USING getState
// 3) USE new Set ON THE POST STATE AND GET THE USER IDS FOR EACH POST
// 4) LOOP THROUGH THE USER IDS AND PASS IT TO DISPATCH fetchUser

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  const userIds = [...new Set(getState().posts.map((post) => post.userId))]; //new Set collect the unique values while getState will get the current state

  userIds.forEach((userId) => dispatch(fetchUser(userId)));
};





// export const fetchUser = (id) => (dispatch) => {
//   _fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
