import { ADD, DELETE, ISLIKE, UPDATE } from "./actionType";
import { store } from "./store";

export const getAll = () => store.getState();

export function deleteMovie(id) {
  store.dispatch({ type: DELETE, payload: { id } });
  return getAll();
}
export function addMovie(data) {
  const movie = { ...data, _id: Date.now(), isLiked: false, isEdit: false };
  store.dispatch({
    type: ADD,
    payload: { ...movie },
  });

  return getAll();
}
export function updateMovie(data, id) {
  const movie = { ...data, id };
  store.dispatch({
    type: UPDATE,
    payload: Object.assign({}, movie, { isEdit: false }),
  });

  return getAll();
}
export function likeMovie(id) {
  store.dispatch({ type: ISLIKE, payload: { id } });
  return getAll();
}
