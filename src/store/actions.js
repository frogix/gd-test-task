import C from "./constants";

export function addWorkerAction() {
  return {
    type: C.ADD_WORKER,
  };
}

export function updateWorkerAction(worker) {
  return {
    type: C.UPDATE_WORKER,
    worker
  };
}

export function removeWorkerAction() {
  return {
    type: C.REMOVE_WORKER
  };
}

export function selectWorkerAction(index) {
  return {
    type: C.SELECT_WORKER,
    selectedIndex: index
  };
}
