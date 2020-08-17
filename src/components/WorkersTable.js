import React from "react";
import { connect } from "react-redux";
import "./WorkersTable.css";
import { selectWorkerAction } from "../store/actions";

class WorkersTable extends React.Component {
  constructor(props) {
    super(props);

    this.selectWorker = this.selectWorker.bind(this);
  }


  selectWorker(index) {
    let newIndex = index;

    // Deselection
    if (index === this.props.selectedIndex) newIndex = -1;

    this.props.selectWorker(newIndex);
  };

  formatDate(date) {
    if (date === undefined) return date;

    const dateTimeFormat = new Intl.DateTimeFormat("ru", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    const [
      { value: day },
      ,
      { value: month },
      ,
      { value: year }
    ] = dateTimeFormat.formatToParts(date);

    return `${day}.${month}.${year}`;
  }

  createTable() {
    const workers = this.props.workers;

    if (workers.length === 0) {
      return <tr><td colSpan="5">Нет рабочих</td></tr>;
    }

    return workers.map((worker, index) => {
      const { name, jobTitle, bornDate, sex, isFired } = worker;

      return (
        <tr
          className={ index === this.props.selectedIndex ? 'is-active' : "" }
          onClick={ () => this.selectWorker(index) }
          key={ index }
        >
          <td>{name}</td>
          <td>{jobTitle}</td>
          <td>{this.formatDate(bornDate)}</td>
          <td>{sex}</td>
          <td>{isFired ? "Да" : "Нет"}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="table table-responsive-lg workers-table">
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Должность</th>
            <th>Дата рождения</th>
            <th>Пол</th>
            <th>Уволен?</th>
          </tr>
        </thead>
        <tbody>{this.createTable()}</tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  workers: state.workers,
  selectedIndex: state.selectedWorkerIndex
});

const mapDispatchToProps = (dispatch) => ({
  selectWorker: (index) => dispatch(selectWorkerAction(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkersTable);
