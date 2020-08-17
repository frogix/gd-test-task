import React from "react";
import { connect } from "react-redux";


import WorkersTable from "./WorkersTable";

import EditWorkerForm from "./EditWorkerForm";

class Page extends React.Component {
  render() {
    const {
      workers,
      selectedWorkerIndex
    } = this.props;

    const selectedWorker = workers[selectedWorkerIndex];

    return (
      <div className="container">
        <h1 className="my-4">Работники предприятия</h1>
        <div className="row">
          <div className="col-lg-7">
            <p> Список данных работников </p>
            <WorkersTable />
          </div>

          <div className="col-lg-4 offset-lg-1">
            <h3>Редактирование</h3>
            <EditWorkerForm worker={selectedWorker} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  workers: state.workers,
  selectedWorkerIndex: state.selectedWorkerIndex
});

export default connect(mapStateToProps)(Page);
