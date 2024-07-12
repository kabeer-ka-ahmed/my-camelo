import React, { useState } from "react";
import { Icon } from "@iconify/react";
import AirportRide from "./AirportRide";
import ScheduledRide from "./ScheduledRide";
import RideByHour from "./RideByHour";
import Heading from "../base/Heading";
import Paragraph from "../base/Paragraph";
import { setLoading } from "../../redux/actions/loaderAction";
import { useDispatch } from "react-redux";

export default function HeroSection() {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("airport");
  const [subTab, setSubTab] = useState(1);

  const [showSignUp, setShowSignUp] = useState(false);
  const [showAlreadyRegistered, setShowAlreadyRegistered] = useState(false);
  const [showOTPScreen, setShowOTPScreen] = useState(false);
  const [hideCreateAccountButton, setHideCreateAccountButton] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [hidePhoneCreateAccountButton, setHidePhoneCreateAccountButton] = useState(false);
  const [showPhoneOTPScreen, setShowPhoneOTPScreen] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const recaptchaRef = React.createRef();
  const [otp, setOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");

  const handleTabChange = (tabName) => {
    dispatch(setLoading(true))
    if (tabName !== activeTab) {
      setActiveTab(tabName);
      setShowSignUp(false)
      setShowAlreadyRegistered(false)
      setShowOTPScreen(false)
      setHideCreateAccountButton(false)
      setShowPhone(false)
      setHideCreateAccountButton(false)
      setOtp("")
      setShowPhoneOTPScreen(false)
      setHidePhoneCreateAccountButton(false)
      setPhoneOtp("")
      setShowPaymentMethod(false)
      setSubTab(1)
    }
    if (tabName === "airport" || tabName === "scheduled") {
      if (subTab === 4 && showSignUp && !showAlreadyRegistered && !showOTPScreen && !showPhone && !showPhoneOTPScreen && !showPaymentMethod) {
        setSubTab(1)
        setShowSignUp(false)
      } else if (subTab === 4 && showSignUp && showAlreadyRegistered && !showOTPScreen && !showPhone && !showPhoneOTPScreen && !showPaymentMethod) {
        setShowAlreadyRegistered(false)
      } else if (subTab === 4 && showSignUp && !showAlreadyRegistered && showOTPScreen && !showPhone && !showPhoneOTPScreen && !showPaymentMethod) {
        setShowOTPScreen(false)
        setHideCreateAccountButton(false)
        recaptchaRef.current.reset();
      } else if (subTab === 4 && showSignUp && showOTPScreen && showPhone && !showPhoneOTPScreen && !showPaymentMethod) {
        setShowPhone(false)
        setHideCreateAccountButton(false)
        setOtp("")
        setShowOTPScreen(false)
      } else if (subTab === 4 && showSignUp && showOTPScreen && showPhone && showPhoneOTPScreen && !showPaymentMethod) {
        setShowPhoneOTPScreen(false)
        setHidePhoneCreateAccountButton(false)
        setOtp("")
        setPhoneOtp("")
      }
    }else{
      if (subTab === 3 && showSignUp && !showAlreadyRegistered && !showOTPScreen && !showPhone && !showPhoneOTPScreen && !showPaymentMethod) {
        setSubTab(1)
        setShowSignUp(false)
      } else if (subTab === 3 && showSignUp && showAlreadyRegistered && !showOTPScreen && !showPhone && !showPhoneOTPScreen && !showPaymentMethod) {
        setShowAlreadyRegistered(false)
      } else if (subTab === 3 && showSignUp && !showAlreadyRegistered && showOTPScreen && !showPhone && !showPhoneOTPScreen && !showPaymentMethod) {
        setShowOTPScreen(false)
        setHideCreateAccountButton(false)
        recaptchaRef.current.reset();
      } else if (subTab === 3 && showSignUp && showOTPScreen && showPhone && !showPhoneOTPScreen && !showPaymentMethod) {
        setShowPhone(false)
        setHideCreateAccountButton(false)
        setOtp("")
        setShowOTPScreen(false)
      } else if (subTab === 3 && showSignUp && showOTPScreen && showPhone && showPhoneOTPScreen && !showPaymentMethod) {
        setShowPhoneOTPScreen(false)
        setHidePhoneCreateAccountButton(false)
        setOtp("")
        setPhoneOtp("")
      }
    }
    dispatch(setLoading(false))
  };

  return (
    <>
      <div
        className={`${activeTab === "airport"
          ? "bg-airport_ride_bg"
          : activeTab === "scheduled"
            ? "bg-scheduled_ride_bg"
            : "bg-by_hour_bg"
          } transition-all duration-300 mx-auto h-auto bg-cover bg-fixed bg-start bg-no-repeat`}
      >
        <div className="py-5 md:py-10 px-10 md:px-20 flex flex-col md:flex-col lg:flex-row justify-between items-center">
          <div className="md:w-[592px]">
            <div className="my-4">
              {activeTab === "airport" ? (
                <Heading
                  title="Airport Ride"
                  className="text-2xl md:text-5xl lg:text-5xl text-text_white"
                />
              ) : null}
              {activeTab === "scheduled" ? (
                <Heading
                  title="Scheduled Ride"
                  className="text-2xl md:text-5xl lg:text-5xl text-text_white"
                />
              ) : null}
              {activeTab === "hour" ? (
                <Heading
                  title="Ride By Hour"
                  className="text-2xl md:text-5xl lg:text-5xl text-text_white"
                />
              ) : null}
            </div>
            <div className="my-4 w-11/12">
              {activeTab === "airport" ? (
                <Paragraph
                  title="Embark on seamless journeys with our airport transfer service—effortlessly whisking you to and from your destination in style, comfort, and punctuality, leaving you free to relax or prepare for your next adventure."
                  className="text-normal md:text-lg  lg:text-lg  text-text_white"
                />
              ) : null}
              {activeTab === "scheduled" ? (
                <Paragraph
                  title="Embark on seamless journeys with our airport transfer service—effortlessly whisking you to and from your destination in style, comfort, and punctuality, leaving you free to relax or prepare for your next adventure."
                  className="text-normal md:text-lg  lg:text-lg  text-text_white"
                />
              ) : null}
              {activeTab === "hour" ? (
                <Paragraph
                  title="Secure your peace of mind with our pre-scheduled car bookings, ensuring prompt, reliable transportation with experienced drivers at your service, tailored to your itinerary and preferences."
                  className="text-normal md:text-lg  lg:text-lg  text-text_white"
                />
              ) : null}
            </div>
          </div>

          <div className="md:w-[592px]">
            {/* tabs code is here */}
            <div className="bg-background_white py-2 px-4 flex flex-row justify-between items-center rounded transition-all duration-300">
              <div
                className={`py-1 px-5 md:py-2 md:px-10 flex flex-col items-center cursor-pointer rounded transition-all duration-300 ${activeTab === "airport"
                  ? "bg-background_steel_blue text-text_white"
                  : ""
                  }`}
                onClick={() => handleTabChange("airport")}
              >
                <div className="py-1">
                  <Icon icon="icons8:airport" width="28px" height="28px" />
                </div>
                <div className="py-1 text-sm md:text-normal text-center">Airport Ride</div>
              </div>
              <div
                className={`py-1 px-5 md:py-2 md:px-10 flex flex-col items-center cursor-pointer rounded transition-all duration-300 ${activeTab === "scheduled"
                  ? "bg-background_steel_blue text-text_white"
                  : ""
                  }`}
                onClick={() => handleTabChange("scheduled")}
              >
                <div className="py-1">
                  <Icon
                    icon="mdi:invoice-text-scheduled-outline"
                    width="28px"
                    height="28px"
                  />
                </div>
                <div className="py-1 text-sm md:text-normal text-center">
                  Scheduled Ride
                </div>
              </div>
              <div
                className={`py-1 px-5 md:py-2 md:px-10 flex flex-col items-center cursor-pointer rounded transition-all duration-300 ${activeTab === "hour"
                  ? "bg-background_steel_blue text-text_white"
                  : ""
                  }`}
                onClick={() => handleTabChange("hour")}
              >
                <div className="py-1">
                  <Icon icon="mingcute:hours-line" width="28px" height="28px" />
                </div>
                <div className="py-1 text-sm md:text-normal text-center">Ride By Hour</div>
              </div>
            </div>
            {/* tabs code is here */}

            {/* content is here */}
            <div className="mt-1 bg-background_white p-2 md:p-6 flex flex-row justify-between items-center rounded transition-all duration-300">
              {activeTab === "airport" && (
                <div className="w-full transition-all duration-300">
                  <AirportRide
                    subTab={subTab}
                    setSubTab={setSubTab}
                    showSignUp={showSignUp}
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
                    setHidePhoneCreateAccountButton={setHidePhoneCreateAccountButton}
                    showPhoneOTPScreen={showPhoneOTPScreen}
                    setShowPhoneOTPScreen={setShowPhoneOTPScreen}
                    showPaymentMethod={showPaymentMethod}
                    setShowPaymentMethod={setShowPaymentMethod}
                    recaptchaRef={recaptchaRef}
                    otp={otp}
                    setOtp={setOtp}
                    phoneOtp={phoneOtp}
                    setPhoneOtp={setPhoneOtp}
                  />
                </div>
              )}
              {activeTab === "scheduled" && (
                <div className="w-full transition-all duration-300">
                  <ScheduledRide
                    subTab={subTab}
                    setSubTab={setSubTab}
                    showSignUp={showSignUp}
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
                    setHidePhoneCreateAccountButton={setHidePhoneCreateAccountButton}
                    showPhoneOTPScreen={showPhoneOTPScreen}
                    setShowPhoneOTPScreen={setShowPhoneOTPScreen}
                    showPaymentMethod={showPaymentMethod}
                    setShowPaymentMethod={setShowPaymentMethod}
                    recaptchaRef={recaptchaRef}
                    otp={otp}
                    setOtp={setOtp}
                    phoneOtp={phoneOtp}
                    setPhoneOtp={setPhoneOtp}
                  />
                </div>
              )}
              {activeTab === "hour" && (
                <div className="w-full transition-all duration-300">
                  <RideByHour
                    subTab={subTab}
                    setSubTab={setSubTab}
                    showSignUp={showSignUp}
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
                    setHidePhoneCreateAccountButton={setHidePhoneCreateAccountButton}
                    showPhoneOTPScreen={showPhoneOTPScreen}
                    setShowPhoneOTPScreen={setShowPhoneOTPScreen}
                    showPaymentMethod={showPaymentMethod}
                    setShowPaymentMethod={setShowPaymentMethod}
                    recaptchaRef={recaptchaRef}
                    otp={otp}
                    setOtp={setOtp}
                    phoneOtp={phoneOtp}
                    setPhoneOtp={setPhoneOtp}
                  />
                </div>
              )}
            </div>
            {/* content is here */}
          </div>
        </div>
      </div>
    </>
  );
}