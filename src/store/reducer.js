import C from "./constants.js";

function createWorker(state) {
  const newWorker = {
    name: `Рабочий №${state.workers.length + 1}`,
    jobTitle: state.jobTitles[0],
    bornDate: new Date(),
    sex: "Male",
    isFired: false
  }

  return { ...state, workers: [...state.workers, newWorker], selectedWorkerIndex: state.workers.length};
}

function updateWorker(state, worker) {
  const workers = [...state.workers];

  workers[state.selectedWorkerIndex] = worker;

  return { ...state, workers: [...workers] };
}

function removeWorker(state) {
  const workers = state.workers.filter(
    (worker, index) => index !== state.selectedWorkerIndex
  );

  return {
    ...state,
    workers,
    selectedWorkerIndex: state.selectedWorkerIndex - 1
  };
}

function addReducer(state = {}, action) {
  switch (action.type) {
    case C.ADD_WORKER:
      return createWorker(state);
    case C.REMOVE_WORKER:
      return removeWorker(state);
    case C.SELECT_WORKER:
      return { ...state, selectedWorkerIndex: action.selectedIndex };
    case C.UPDATE_WORKER:
      return updateWorker(state, action.worker, action.index);
    default:
      return state;
  }
}

export default addReducer;
