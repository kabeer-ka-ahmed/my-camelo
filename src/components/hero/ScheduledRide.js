import React, {useEffect, useMemo, useState} from 'react';
import Stepper from '../base/Stepper';
import Button from '../base/Button';
import Heading from '../base/Heading';
import MapModal from '../base/MapModal';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCitiesRequest} from '../../redux/actions/cityActions';
import {fetchVehicleTypesRequest} from '../../redux/actions/vehicleTypeAction';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import InputFieldFormik from '../base/InputFieldFormik';
import {getZoneRequest} from '../../redux/actions/zoneActions';
import HomeEmailSignUp from './HomeEmailSignUp';
import {setLoading} from '../../redux/actions/loaderAction';
import VehicleTypeModal from '../base/VehicleTypeModal';
import PaymentMethod from './PaymentMethod';
// import axios from "axios";
import {message} from 'antd';
import {useTranslation} from 'react-i18next';
import axiosInstance from '../../Api';

export default function ScheduledRide({
  subTab,
  setSubTab,
  showSignUp,
  setShowSignUp,
  showAlreadyRegistered,
  setShowAlreadyRegistered,
  showOTPScreen,
  setShowOTPScreen,
  hideCreateAccountButton,
  setHideCreateAccountButton,
  showPhone,
  setShowPhone,
  hidePhoneCreateAccountButton,
  setHidePhoneCreateAccountButton,
  showPhoneOTPScreen,
  setShowPhoneOTPScreen,
  showPaymentMethod,
  setShowPaymentMethod,
  recaptchaRef,
  otp,
  setOtp,
  phoneOtp,
  setPhoneOtp,
  showPaybylinkQr,
  setShowPaybylinkQr,
}) {
  const dispatch = useDispatch();
  const {cities} = useSelector((state) => state.cities);
  // const { vehicleTypes } = useSelector((state) => state.vehicleTypes);
  const language = useSelector((state) => state.auth.language);
  const zoneMap = useSelector((state) => state?.zone?.zone);
  const [map, setMap] = useState(null);
  useEffect(() => {
    setMap(zoneMap && zoneMap.length > 0 ? zoneMap : null);
  }, [zoneMap]);
  const services = 'City Trip';
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [t, i18n] = useTranslation('global');

  const [seatNumberOptions, setSeatNumberOptions] = useState([]);
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [selectedDropoff, setSelectedDropoff] = useState(null);
  const [arrivalDates, setArrivalDates] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [formValues, setFormValues] = useState({
    arrivalCity: '',
    arrivalDate: '',
    arrivalTime: '',
    vehicleType: '',
    seatNumber: '',
    sharedRide: false,
  });
  const [onChangeFormValues, setOnChangeFormValues] = useState({
    arrivalCity: '',
    arrivalDate: '',
    arrivalTime: '',
    vehicleType: '',
    seatNumber: '',
    sharedRide: false,
  });

  const [vehicleTypeName, setVehicleTypeName] = useState('');
  const API_BASE_URL = process.env.REACT_APP_BASE_URL_AMK_TEST;
  const [sharedRideValue, setSharedRideValue] = useState('');

  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');

  const [VehicleTypeWithService, setVehicleTypeWithService] = useState(null);
  useEffect(() => {
    dispatch(setLoading(true));
    const getVechileTypes = async () => {
      if (cityName) {
        try {
          const response = await axiosInstance.get(
            `${API_BASE_URL}/api/method/airport_transport.api.bookings.get_vehicle_types?language=${
              language ? language : 'en'
            }&service=City Trip&city=${cityName}`
          );
          if (response && response.status === 200) {
            setVehicleTypeWithService(response.data);
          }
        } catch (error) {
          console.log('Error', error);
        }
      }
    };
    getVechileTypes();
    dispatch(setLoading(false));
  }, [cityName]);

  useEffect(() => {
    if (vehicleTypeName !== '') {
      const selectedVehicle = VehicleTypeWithService.data.find(
        (vehicle) => vehicle.name === vehicleTypeName
      );
      setSeatNumberOptions(
        selectedVehicle
          ? Array.from({length: selectedVehicle.seats}, (_, i) => `${i + 1}`)
          : []
      );
      setOnChangeFormValues((prevValues) => ({
        ...prevValues,
        ['vehicleType']: vehicleTypeName,
      }));
    }
  }, [vehicleTypeName]);

  const [showSharedRideValue, setShowSharedRideValue] = useState(false);
  useEffect(() => {
    const getSharedRideValue = async () => {
      dispatch(setLoading(true));
      if (vehicleTypeName !== '') {
        try {
          const response = await axiosInstance.get(
            `${API_BASE_URL}/api/method/airport_transport.api.bookings.get_ride_discount?vehicle_type=${vehicleTypeName}&language=${language}`
          );
          if (response && response.status === 200) {
            console.log('response.data.data me kiya ha?', response.data.data);
            if (response.data.data > 0) {
              setShowSharedRideValue(true);
            }
            setSharedRideValue(response.data.data);
            dispatch(setLoading(false));
          }
        } catch (error) {
          console.log('Error', error);
          dispatch(setLoading(false));
        }
      }
      dispatch(setLoading(false));
    };
    getSharedRideValue();
  }, [vehicleTypeName]);

  const handlePrevious = (step, values) => {
    dispatch(setLoading(true));
    setFormValues(values);
    setSubTab(step);
    dispatch(setLoading(false));
  };
  useEffect(() => {
    dispatch(fetchCitiesRequest());
    dispatch(fetchVehicleTypesRequest());
    const expectedCityName = cityName ? cityName : 'Dammam';
    dispatch(getZoneRequest(services, expectedCityName));
  }, [dispatch, cityName]);

  // useEffect(() => {
  //   if (cities.data?.length > 0 && !cityName) {
  //     setFormValues((prevValues) => ({
  //       ...prevValues,
  //       arrivalCity: cities.data[0],
  //     }));
  //     setOnChangeFormValues((prevValues) => ({
  //       ...prevValues,
  //       arrivalCity: cities.data[0],
  //     }));
  //     setCityName(cities.data[0]);
  //   }
  // }, [cities]);

  const steps = useMemo(() => {
    const baseSteps = [
      {id: 1, text: t('hero.stepper_steps.ride_detail_text')},
      {id: 2, text: t('hero.stepper_steps.vehicle_detail_text')},
      {id: 3, text: t('hero.stepper_steps.additional_info_text')},
    ];

    if (!isLoggedIn) {
      baseSteps.push({
        id: 4,
        text: t('hero.stepper_steps.account_info_text'),
      });
    }

    return baseSteps;
  }, [isLoggedIn, t]);

  // const [subTab, setSubTab] = useState(1);

  const validationSchema = Yup.object().shape({
    arrivalCity: Yup.string().required('Arrival City is required'),
    arrivalDate: Yup.string().required('Arrival Date is required'),
    arrivalTime: Yup.string().required('Arrival Time is required'),
    vehicleType: Yup.string().required('vehicle Type is required'),
    // seatNumber: Yup.string().required("Seat Number is required"),
    sharedRide: Yup.bool(),
  });

  const onSubmit = async (values, {setSubmitting}) => {
    if (!location || !destination) {
      message.error(t('hero.errors.map_required'));
    } else {
      dispatch(setLoading(true));

      if (isLoggedIn) {
        dispatch(setLoading(false));
        setShowPaymentMethod(true);
      } else {
        dispatch(setLoading(false));
        setSubTab(4);
        setShowSignUp(true);
      }
    }
    setSubmitting(false);
    dispatch(setLoading(false));
  };

  const handleMapSubmit = (pickup, dropoff) => {
    setSelectedPickup(pickup);
    setSelectedDropoff(dropoff);
  };

  return (
    <>
      <div>
        {!showPaymentMethod && (
          <Stepper
            steps={steps}
            subTab={subTab}
            className={
              'flex items-center w-full text-sm font-medium text-center py-4 border-b text-gray-500 sm:text-base justify-between'
            }
          />
        )}

        <div>
          <div className="p-2 md:p-4">
            {showPaymentMethod ? (
              <PaymentMethod
                formValues={formValues}
                selectedPickup={selectedPickup}
                selectedDropoff={selectedDropoff}
                location={location}
                destination={destination}
                sharedRideValue={sharedRideValue}
                setSubTab={setSubTab}
                setShowSignUp={setShowSignUp}
                setShowAlreadyRegistered={setShowAlreadyRegistered}
                setShowOTPScreen={setShowOTPScreen}
                setHideCreateAccountButton={setHideCreateAccountButton}
                setShowPhone={setShowPhone}
                setHidePhoneCreateAccountButton={
                  setHidePhoneCreateAccountButton
                }
                setShowPhoneOTPScreen={setShowPhoneOTPScreen}
                setShowPaymentMethod={setShowPaymentMethod}
                showPaybylinkQr={showPaybylinkQr}
                setShowPaybylinkQr={setShowPaybylinkQr}
                rideName="City Trip"
              />
            ) : showSignUp ? (
              <>
                <HomeEmailSignUp
                  formValues={formValues}
                  setSubTab={setSubTab}
                  setShowSignUp={setShowSignUp}
                  showAlreadyRegistered={showAlreadyRegistered}
                  setShowAlreadyRegistered={setShowAlreadyRegistered}
                  showOTPScreen={showOTPScreen}
                  setShowOTPScreen={setShowOTPScreen}
                  setHideCreateAccountButton={setHideCreateAccountButton}
                  hideCreateAccountButton={hideCreateAccountButton}
                  showPhone={showPhone}
                  setShowPhone={setShowPhone}
                  hidePhoneCreateAccountButton={hidePhoneCreateAccountButton}
                  setHidePhoneCreateAccountButton={
                    setHidePhoneCreateAccountButton
                  }
                  showPhoneOTPScreen={showPhoneOTPScreen}
                  setShowPhoneOTPScreen={setShowPhoneOTPScreen}
                  showPaymentMethod={showPaymentMethod}
                  setShowPaymentMethod={setShowPaymentMethod}
                  recaptchaRef={recaptchaRef}
                  otp={otp}
                  setOtp={setOtp}
                  phoneOtp={phoneOtp}
                  setPhoneOtp={setPhoneOtp}
                  showPaybylinkQr={showPaybylinkQr}
                  setShowPaybylinkQr={setShowPaybylinkQr}
                />
              </>
            ) : (
              <Formik
                initialValues={formValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({values, errors, setFieldValue, validateForm}) => {
                  const isStep1Valid =
                    values.arrivalCity &&
                    values.arrivalDate &&
                    values.arrivalTime;
                  const isStep2Valid =
                    // values.vehicleType &&
                    // formValues.sharedRide === true ? values.seatNumber : '' &&
                    values.arrivalDate && values.arrivalTime;

                  return (
                    <Form className="mx-auto w-full">
                      {subTab === 1 && (
                        <>
                          <div>
                            <InputFieldFormik
                              label={t('hero.arrival_city_text')}
                              name="arrivalCity"
                              type="select"
                              options={
                                cities &&
                                cities.data &&
                                cities.data.map((city) => ({
                                  value: city,
                                  label: city,
                                }))
                              }
                              value={
                                formValues.arrivalCity ||
                                onChangeFormValues.arrivalCity
                              }
                              onChange={(valueObj) => {
                                const {fieldName, selectedValue} = valueObj;
                                setFieldValue(fieldName, selectedValue);
                                setCityName(selectedValue);
                                setFormValues((prevValues) => ({
                                  ...prevValues,
                                  [fieldName]: selectedValue,
                                }));
                                setOnChangeFormValues((prevValues) => ({
                                  ...prevValues,
                                  [fieldName]: selectedValue,
                                }));
                              }}
                              required
                            />
                          </div>

                          <div>
                            <InputFieldFormik
                              label={t('hero.arrival_date_text')}
                              name="arrivalDate"
                              type="arrivalDate"
                              value={values.arrivalDate || ''}
                              arrivalDates={arrivalDates}
                              setArrivalDates={setArrivalDates}
                              // onChange={({ fieldName, selectedValue }) => {
                              //   setFieldValue(fieldName, selectedValue);
                              //   setOnChangeFormValues((prevValues) => ({
                              //     ...prevValues,
                              //     [fieldName]: selectedValue,
                              //   }));
                              // }}
                              onChange={({date, dateString}) => {
                                setOnChangeFormValues((prevValues) => ({
                                  ...prevValues,
                                  ['arrivalDate']: dateString,
                                }));
                                setFieldValue('arrivalDate', dateString);
                              }}
                              required
                            />
                          </div>

                          <div>
                            <InputFieldFormik
                              label={t('hero.arrival_time_text')}
                              name="arrivalTime"
                              type="arrivalTime"
                              value={values.arrivalTime || ''}
                              arrivalDates={arrivalDates}
                              onChange={({fieldName, selectedValue}) => {
                                setFieldValue(fieldName, selectedValue);
                                setOnChangeFormValues((prevValues) => ({
                                  ...prevValues,
                                  [fieldName]: selectedValue,
                                }));
                              }}
                              required
                            />
                          </div>

                          <div className="w-full mt-3">
                            <Button
                              className="bg-background_steel_blue cursor-pointer w-full text-text_white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                              onClick={() => {
                                dispatch(setLoading(true));
                                // Error messages for both English and Arabic
                                const errorMessages = {
                                  arrivalCity:
                                    language === 'ar'
                                      ? 'مدينة الوصول مطلوبة'
                                      : 'Arrival city is required',
                                  arrivalDate:
                                    language === 'ar'
                                      ? 'تاريخ الوصول مطلوب'
                                      : 'Arrival date is required',
                                  arrivalTime:
                                    language === 'ar'
                                      ? 'وقت الوصول مطلوب'
                                      : 'Arrival time is required',
                                };
                                if (formValues.arrivalCity) {
                                  values.arrivalCity = formValues.arrivalCity;
                                }
                                const requiredFields = [
                                  'arrivalCity',
                                  'arrivalDate',
                                  'arrivalTime',
                                ];
                                const isStep1Valid = requiredFields.every(
                                  (field) => values[field]
                                );
                                if (!isStep1Valid) {
                                  requiredFields.forEach((field) => {
                                    if (!values[field]) {
                                      // Display the appropriate error message based on the language
                                      message.error(errorMessages[field]);
                                    }
                                  });
                                } else {
                                  setSubTab(2);
                                  setFormValues(values);
                                }
                                dispatch(setLoading(false));
                              }}
                              label={t('next_text')}
                              type="button"
                              // disabled={!isStep1Valid}
                            />
                          </div>
                        </>
                      )}

                      {subTab === 2 && (
                        <>
                          <div>
                            <VehicleTypeModal
                              VehicleTypeWithService={VehicleTypeWithService}
                              vehicleTypeName={vehicleTypeName}
                              setVehicleTypeName={setVehicleTypeName}
                            />
                          </div>
                          {showSharedRideValue && (
                            <div className="border border-bg_light_gray p-2 mt-3">
                              <p className="text-lg text-text_grey font-bold">
                                {t('hero.shared_ride_text')}!!
                              </p>
                              <InputFieldFormik
                                // label={t("hero.shared_ride_text")}
                                name="sharedRide"
                                type="checkbox"
                                percentageValue={sharedRideValue}
                                onChange={({fieldName, selectedValue}) => {
                                  setFieldValue(fieldName, selectedValue);
                                  setFormValues((prevValues) => ({
                                    ...prevValues,
                                    [fieldName]: selectedValue,
                                  }));
                                  setOnChangeFormValues((prevValues) => ({
                                    ...prevValues,
                                    [fieldName]: selectedValue,
                                  }));
                                }}
                                required
                              />
                            </div>
                          )}

                          {formValues.sharedRide && (
                            <div>
                              <InputFieldFormik
                                label={t('hero.seat_number_text')}
                                name="seatNumber"
                                type="select"
                                options={seatNumberOptions.map((number) => ({
                                  value: number,
                                  label: number,
                                }))}
                                value={
                                  formValues.seatNumber ||
                                  onChangeFormValues.seatNumber
                                }
                                onChange={(valueObj) => {
                                  const {fieldName, selectedValue} = valueObj;
                                  setFieldValue(fieldName, selectedValue);
                                  setFormValues((prevValues) => ({
                                    ...prevValues,
                                    [fieldName]: selectedValue,
                                  }));
                                  setOnChangeFormValues((prevValues) => ({
                                    ...prevValues,
                                    [fieldName]: selectedValue,
                                  }));
                                }}
                                required
                              />
                            </div>
                          )}

                          <div className="mt-3 flex flex-row justify-between items-center">
                            <div className="w-1/2 mx-0 md:mx-1">
                              <Button
                                className="bg-bg_btn_back w-full cursor-pointer text-text_white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                onClick={() => handlePrevious(1, values)}
                                label={t('previous_text')}
                                disabled={false}
                                type="button"
                              />
                            </div>
                            <div className="w-1/2 mx-0 md:mx-1">
                              <Button
                                className="bg-background_steel_blue cursor-pointer w-full text-text_white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                onClick={() => {
                                  dispatch(setLoading(true));
                                  if (vehicleTypeName) {
                                    values.vehicleType = vehicleTypeName;
                                  }
                                  // Error messages for both English and Arabic
                                  const errorMessages = {
                                    vehicleType:
                                      language === 'ar'
                                        ? 'نوع المركبة مطلوب'
                                        : 'Vehicle type is required',
                                    seatNumber:
                                      language === 'ar'
                                        ? 'رقم المقعد مطلوب'
                                        : 'Seat number is required',
                                  };
                                  const requiredFields = [
                                    'vehicleType',
                                    formValues.sharedRide && 'seatNumber',
                                  ].filter(Boolean);

                                  const isStep2Valid = requiredFields.every(
                                    (field) => values[field]
                                  );
                                  if (!isStep2Valid) {
                                    requiredFields.forEach((field) => {
                                      if (!values[field]) {
                                        // Display the appropriate error message based on the language
                                        message.error(errorMessages[field]);
                                      }
                                    });
                                  } else {
                                    setSubTab(3);
                                    setFormValues(values);
                                  }
                                  dispatch(setLoading(false));
                                }}
                                label={t('next_text')}
                                type="button"
                                disabled={!isStep2Valid}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {subTab === 3 && (
                        <>
                          {/* <div className="border-b border-gray-300">
                              <InputFieldFormik
                                label={t("hero.shared_ride_text")}
                                name="sharedRide"
                                type="checkbox"
                                percentageValue={sharedRideValue}
                                onChange={(valueObj) => {
                                  // Destructure fieldName and selectedValue from the object
                                  const { fieldName, selectedValue } = valueObj;
                                  // Handle the selected value accordingly
                                  setFieldValue(fieldName, selectedValue);
                                }}
                                required
                              />
                            </div> */}

                          <div className="my-4 flex flex-col md:flex-row justify-between items-start">
                            <div className="w-full md:w-1/2 mx-0 md:mx-1">
                              <Heading
                                title={t('hero.set_destination_text')}
                                className={'text-xl text-text_black'}
                              />
                            </div>
                            <div className="w-full md:w-1/2 mx-0 md:mx-1">
                              <MapModal
                                rideName="scheduledRide"
                                formValues={formValues}
                                onSubmitDestination={handleMapSubmit}
                                zoneCoords={map}
                                cityName={values.arrivalCity}
                                location={location}
                                setLocation={setLocation}
                                destination={destination}
                                setDestination={setDestination}
                              />
                            </div>
                          </div>

                          <div className="mt-3 flex md:flex-row justify-between items-center">
                            <div className="w-1/2 mx-0 md:mx-1">
                              <Button
                                className="bg-bg_btn_back cursor-pointer w-full text-text_white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                onClick={() => handlePrevious(2, values)}
                                label={t('previous_text')}
                                type="button"
                              />
                            </div>
                            <div className="w-1/2 mx-0 md:mx-1">
                              <Button
                                className="bg-background_steel_blue cursor-pointer w-full text-text_white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                label={t('submit_text')}
                                type="submit"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </Form>
                  );
                }}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
