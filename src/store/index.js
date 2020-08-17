import { createStore } from "redux";
import reducers from "./reducer";

const initialState = {
  workers: [
    {
      id: 0,
      name: "Путин Владимир Владимирович",
      jobTitle: "Администратор",
      bornDate: new Date(2001, 0, 1),
      sex: "Мужской",
      isFired: false,
      colleaguesIDs: [1, 3]
    },
    {
      id: 1,
      name: "Пушкин Александр Сергеевич",
      jobTitle: "Секретарь",
      bornDate: new Date(1997, 1, 1),
      sex: "Мужской",
      isFired: true,
      colleaguesIDs: [0]
    },
    {
      id: 2,
      name: "Бочкарев Вадим Александрович",
      jobTitle: "JS Разработчик",
      bornDate: new Date(2000, 6, 21),
      sex: "Мужской",
      isFired: false,
      colleaguesIDs: []
    },
    {
      id: 3,
      name: "Лохвицкая Надежда Александровна",
      jobTitle: "Бухгалтер",
      bornDate: new Date(1989, 3, 1),
      sex: "Женский",
      isFired: false,
      colleaguesIDs: [0]
    } 

  ],
  selectedWorkerIndex: 0,
  jobTitles: [
    'JS Разработчик',
    'Администратор',
    'Бухгалтер',
    'Директор',
    'Уборщик',
    'Секретарь'
  ]
};

const store = createStore(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
