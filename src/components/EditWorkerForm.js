import React from "react";
import { connect } from "react-redux";
import {
  selectWorkerAction,
  updateWorkerAction,
  removeWorkerAction,
  addWorkerAction
} from "../store/actions";

class EditWorkerForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.removeHandle = this.removeHandle.bind(this);
    this.addHandle = this.addHandle.bind(this);
  }

  addHandle() {
    this.props.addWorker(); 
  }

  readSelectMultipleValues(select) {
    const result = [];
    const options = select && select.options;

    for (let i = 0; i < options.length; i++) {
      let opt = options[i];

      if (opt.selected) {
        let val = Number(opt.value || opt.text);
        result.push(val);
      }
    }
    return result;
  }

  handleInputChange(event) {
    const target = event.target;
    const name   = target.name;
    let   value  = target.value;

    const updatedWorker = { ...this.props.selectedWorker };

    if (name === 'isFired') value = target.checked;
    if (name === 'bornDate') value = new Date(value);

    if (name === 'colleaguesIDs') value = this.readSelectMultipleValues(target);

    updatedWorker[name] = value;

    this.props.updateWorker(updatedWorker);
  }

  removeHandle(evt) {
    evt.preventDefault();
    this.props.removeWorker();
  }



  dateToHTMLString(date) {
    const yyyy = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const MM   = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    const dd   = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

    return `${yyyy}-${MM}-${dd}`;
  }

  render() {
    const { handleInputChange, dateToHTMLString, removeHandle, addHandle } = this;

    const workers = this.props.workers;

    let selectedWorker = this.props.selectedWorker;
    let isEditable = selectedWorker !== undefined;

    if (!isEditable) {
      selectedWorker = {
        name: "",
        jobTitle: "",
        bornDate: new Date(),
        isFired: false,
        sex: "Мужской",
        colleaguesIDs: []
      };
    }

    const {name, bornDate, jobTitle, isFired, sex, colleaguesIDs} = selectedWorker;

    const jobTitles = this.props.jobTitles;

    return (
      <form>
        <div className="form-group">
          <label htmlFor="nameInput"> ФИО полностью </label>
          <input
            className="form-control"
            id="nameInput"
            name="name"
            onChange={handleInputChange}
            placeholder="ФИО"
            type="text"
            value={name}
            disabled={!isEditable}
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobTitleSelect">Должность</label>
          <select
            value={jobTitle}
            id="jobTitleSelect"
            name="jobTitle"
            className="form-control"
            onChange={handleInputChange}
            disabled={!isEditable}
          >
            {
              jobTitles.map((job, index) => 
                <option value={job} key={index}>{job}</option>
              )
            }

          </select>
        </div>
        <div className="form-group">
          <label htmlFor="bornDateInput">Дата рождения</label>
          <input
            className="form-control"
            name="bornDate"
            id="bornDateInput"
            onChange={handleInputChange}
            type="date"
            value={dateToHTMLString(bornDate)}
            disabled={!isEditable}
          />  
        </div>
        <div className="form-group">
          <div className="">Пол</div>
          <div className="form-check">
              <input
                checked={sex === "Мужской"}
                className="form-check-input"
                name="sex"
                id="maleRadio"
                onChange={handleInputChange}
                type="radio"
                value="Мужской"
                disabled={!isEditable}
              />
              <label htmlFor="maleRadio">Мужской</label>
          </div>
          <div className="form-check">
            <input
              checked={sex === "Женский"}
              className="form-check-input"
              id="femaleRadio"
              name="sex"
              onChange={handleInputChange}
              type="radio"
              value="Женский"
              disabled={!isEditable}
            />
            <label htmlFor="femaleRadio">Женский</label>
          </div>
        </div>
        <div className="form-check">
          <input
            name="isFired"
            onChange={handleInputChange}
            className="form-check-input"
            type="checkbox"
            checked={isFired}
            id="isFiredInput"
            disabled={!isEditable}
          />
          <label className="" htmlFor="isFiredInput">Уволен</label>
        </div>
        <div className="form-group">
          <label htmlFor="bornDateInput">Коллеги</label>
          <select
            value={colleaguesIDs}
            id="jobTitleSelect"
            name="colleaguesIDs"
            className="form-control"
            onChange={handleInputChange}
            multiple={true}
            disabled={!isEditable}
          >
            {
              workers
                .filter((worker) => worker !== this.props.selectedWorker)
                .map((worker, index) => 
                    <option value={worker.id} key={worker.id}>{worker.name}</option>
                  )
            }

          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={removeHandle} disabled={!isEditable}>Удалить</button>
        <button type="button" className="btn btn-primary ml-1" onClick={addHandle}>Добавить</button>
      </form>

    );
  }
}

const mapStateToProps = (state) => ({
  selectedWorker: state.workers[state.selectedWorkerIndex],
  jobTitles: state.jobTitles,
  workers: state.workers
});

const mapDispatchToProps = (dispatch) => ({
  selectWorker: (index) => dispatch(selectWorkerAction(index)),
  updateWorker: (worker) => dispatch(updateWorkerAction(worker)),
  addWorker: (worker) => dispatch(addWorkerAction()),
  removeWorker: () => dispatch(removeWorkerAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkerForm);
