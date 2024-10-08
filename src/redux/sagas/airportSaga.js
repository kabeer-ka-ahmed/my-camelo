import { call, put, takeEvery } from "redux-saga/effects";
// import axios from "axios";
import {
  FETCH_AIRPORT_REQUEST,
  fetchAirportSuccess,
  fetchAirportFailure,
} from "../actions/airportActions";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../Api";

const API_BASE_URL = process.env.REACT_APP_BASE_URL_AMK_TEST;

function fetchAirport(action) {
  const cityName = action.payload;
  const language = secureLocalStorage.getItem("language");
  return axiosInstance.get(
    `${API_BASE_URL}/api/method/airport_transport.api.bookings.get_airport?city=${cityName}&language=${language ? language : 'eng'}`
  );
}

function* fetchAirportSaga(action) {
  try {
    const response = yield call(fetchAirport, action);
    yield put(fetchAirportSuccess(response.data));
  } catch (error) {
    yield put(fetchAirportFailure(error.message));
  }
}

function* airportSaga() {
  yield takeEvery(FETCH_AIRPORT_REQUEST, fetchAirportSaga);
}

export default airportSaga;
