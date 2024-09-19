import React, { useEffect } from "react";
import { Events, scrollSpy } from "react-scroll";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../redux/actions/loaderAction";
// import axios from "axios";
import Header from "../base/Header";
import Footer from "../base/Footer";
import Button from "../base/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import axiosInstance from "../../../Api";
import InProgressVerification from "../assets/paymentconditions/Booked.png";

export default function AgentPaymentVerification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector((state) => state.auth.language);
  const [t, i18n] = useTranslation("global");
  const token = useSelector((state) => state.auth.token);

  const paymentMethodName = localStorage.getItem("paymentMethodName");
  const saveData = localStorage.getItem("saveData");
  const savePaymentStatus = localStorage.getItem("savePaymentStatus");
  var bookingValues = localStorage.getItem("bookingValues");
  var josnbookingValues = JSON.parse(bookingValues);
  // console.log('ggg', josnbookingValues)
  const newBookingData = {
    airport: josnbookingValues.airport,
    rider: josnbookingValues.rider,
    location: josnbookingValues.location,
    city: josnbookingValues.city,
    terminal: josnbookingValues?.terminal ? josnbookingValues.terminal : "",
    arrival_date: josnbookingValues.arrival_date,
    arrival_time: josnbookingValues.arrival_time,
    vehicle_type: josnbookingValues.vehicle_type,
    shared_discount: josnbookingValues.ride_discount,
    price: josnbookingValues.price,
    ride_proposal: josnbookingValues.ride_proposal,
    zone: josnbookingValues?.city
      ? josnbookingValues.city === "الدمام" ||
        josnbookingValues.city === "Dammam"
        ? "Dammam"
        : "Riyadh"
      : "",
    pick_up: josnbookingValues.pick_up,
    language: language,
    destination: josnbookingValues.destination_name,
    service_type: josnbookingValues.service_type,
    payment_method: paymentMethodName,
    booking_hours:
      josnbookingValues.service_type === "Book Vehicle In Hours"
        ? josnbookingValues.booking_hours
        : "",
  };
  // console.log(newBookingData)

  const currentUrl = window.location.href;
  const urlObject = new URL(currentUrl);
  const searchParams = urlObject.searchParams;
  const id = searchParams.get("id");
  const checkoutId = searchParams.get("checkoutId");
  const extractedId = checkoutId.split(".")[0];

  const API_BASE_URL = process.env.REACT_APP_BASE_URL_AMK_TEST;

  useEffect(() => {
    dispatch(setLoading(true));
    if ((checkoutId, extractedId)) {
      if (savePaymentStatus === "false") {
        const getPayByLinkBookingStatus = async () => {
          try {
            const response = await axiosInstance.get(
              `${API_BASE_URL}/api/method/airport_transport.api.integrations.paybylink.get_payment_status?id=${id}&checkoutId=${checkoutId}`
            );
            console.log("response", response);
            if (response && response.status === 200) {
              localStorage.setItem("savePaymentStatus", true);
              navigate("/mashrouk-new-ui/agent/thank-you");
            }
          } catch (error) {
            console.error("Error:", error);
            navigate("/mashrouk-new-ui/agent/payment-failed");
          }
        };
        getPayByLinkBookingStatus();
      }
    }
    dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    Events.scrollEvent.register("begin", function (to, element) {});
    Events.scrollEvent.register("end", function (to, element) {});

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  return (
    <>
      <div>
        <Header />

        <main className="mt-20" dir={language === "ar" ? "rtl" : "ltr"}>
          {/* Form Section */}
          <div className="container mx-auto p-4 mt-5">
            <div className="grid grid-cols-1 gap-3">
              <div className="mx-auto">
                <img
                  src={InProgressVerification}
                  width={270}
                  alt="payment success"
                />
              </div>
            </div>
            <p className="text-background_steel_blue text-center mt-5 text-lg">
              {t("payment_verification_text")}
            </p>
            {/* <div className="flex justify-center mt-5">
              <Button
                className="bg-background_steel_blue text-text_white hover:bg-gray-100 font-medium rounded text-sm px-5 py-2.5 mb-2 "
                label="OK"
                type="button"
                onClick={() => navigate("/mashrouk-new-ui/agent")}
              />
            </div> */}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}