import {createStore} from 'redux';
import timeReducer from "./reducer";

const store = createStore(timeReducer);

export default store;