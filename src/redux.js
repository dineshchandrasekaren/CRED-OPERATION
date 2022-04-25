export function CreateStore(reducer) {
  let state;
  let listener = [];

  function subscribe(listener) {
    listener.push(listener());
  }
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < listener.length; i++) listener[i]();
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}
