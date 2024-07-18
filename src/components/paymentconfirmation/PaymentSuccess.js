import React, { useState, useEffect } from "react";
import { Link, Events, scrollSpy } from "react-scroll";
import { CiGlobe } from "react-icons/ci";
import Button from "../base/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import { signOutRequest } from "../../redux/actions/authActions";
import axios from "axios";
import { setLoading } from "../../redux/actions/loaderAction";

export default function PaymentSuccess() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const formValues = location.state?.formValues;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [saveData, setSaveData] = useState(false);

  const payment = localStorage.getItem('payment');
  const paymentMethodName = localStorage.getItem('paymentMethodName');


  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // make 10 years list

  // Define array of menu items with corresponding component IDs
  const menuItems = [
    { id: "home", text: "Home" },
    { id: "services", text: "Services" },
    { id: "vehicleType", text: "Vehicle Type" },
    // Add more menu items as needed
  ];

  const footerItems = [
    { id: "home", text: "Home" },
    { id: "services", text: "Services" },
    { id: "vehicleType", text: "Vehicle Type" },
  ];

  const footerItemsTwo = [
    { text: "Privacy Policy", href: "#" },
    { text: "Terms of Service", href: "#" },
    { text: "Cookies Settings", href: "#" },
  ];

  useEffect(() => {
    Events.scrollEvent.register("begin", function (to, element) { });
    Events.scrollEvent.register("end", function (to, element) { });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  const handleSetActive = (to) => {
    setActiveSection(to);
  };

  const onClick = ({ key }) => {
    switch (key) {
      case "1":
        navigate("/my-profile");
        break;
      case "2":
        navigate("/my-bookings");
        break;
      case "3":
        message.success(`Logged out`);
        dispatch(signOutRequest());
        navigate("/");
        break;
      default:
        break;
    }
  };

  const items = [
    {
      label: "My Profile",
      key: "1",
    },
    {
      label: "My Booking",
      key: "2",
    },
    {
      label: "Logout",
      key: "3",
    },
  ];

  const API_BASE_URL = process.env.REACT_APP_BASE_URL_AMK_TEST;
  useEffect(() => {
    dispatch(setLoading(true))
    const createPaymentApi = async () => {
      const pId = paymentMethodName === 'mada' ? "8a829449515d198b01517d5601df5584" : "8ac7a4ca8c31c0ef018c34634bf30399";
      const payload = {
        "type": "PAYMENT",
        "payload": {
          "id": pId,
          "paymentType": "PA",
          "paymentBrand": "VISA",
          "amount": "92.00",
          "currency": "EUR",
          "presentationAmount": "92.00",
          "presentationCurrency": "EUR",
          "descriptor": "3017.7139.1650 OPP_Channel ",
          "result": {
            "code": "000.000.000",
            "description": "Transaction succeeded"
          },
          "authentication": {
            "entityId": "8a8294185282b95b01528382b4940245"
          },
          "card": {
            "bin": "420000",
            "last4Digits": "0000",
            "holder": "Jane Jones",
            "expiryMonth": "05",
            "expiryYear": "2018"
          },
          "customer": {
            "givenName": "Jones",
            "surname": "Jane",
            "merchantCustomerId": "jjones",
            "sex": "F",
            "email": "jane@jones.com"
          },
          "customParameters": {
            "SHOPPER_promoCode": "AT052"
          },
          "risk": {
            "score": "0"
          },
          "buildNumber": "ec3c704170e54f6d7cf86c6f1969b20f6d855ce5@2015-12-01 12:20:39 +0000",
          "timestamp": "2015-12-07 16:46:07+0000",
          "ndc": "8a8294174b7ecb28014b9699220015ca_66b12f658442479c8ca66166c4999e78",
          "channelName": "OPP_Channel",
          "source": "SYSTEM",
          "paymentMethod": "CC",
          "shortId": "5420.6916.5424"
        }
      }
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/method/airport_transport.api.integrations.hyperpay.create_transaction`, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response && response.status === 200) {
          console.log(response)
          // dispatch(setLoading(false))
        }
      } catch (error) {
        console.log('Error', error);
        // dispatch(setLoading(false))
      }
    }
    if(payment){
      createPaymentApi();
      localStorage.setItem('payment', 'false');
      dispatch(setLoading(false))
    }
    dispatch(setLoading(false))
    
  }, [])

  return (
    <div>
      <header className="fixed top-0 left-0 w-full z-50">
        {" "}
        {/* Make header fixed */}
        <nav className="bg-background_steel_blue md:h-20 lg:h-20 px-4 lg:px-20 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl md:h-full lg:h-full">
            <button onClick={() => navigate("/")} className="flex items-center">
              <img
                src="/assets/header/logo.png"
                className="w-14 h-14 sm:h-14 my-2"
                alt="Camelo Logo"
              />
            </button>
            <div className="flex flex-row justify-center items-baseline lg:order-2">
              <div>
                <Button
                  className="text-text_white font-medium text-md mr-2 hidden md:flex"
                  onClick={() =>
                    (window.location.href = "http://localhost:3000/#")
                  }
                  label={
                    <>
                      <div className="flex flex-row justify-center items-baseline">
                        <CiGlobe className="text-xl" />
                        <div className="text-md px-2">Ar</div>
                      </div>
                    </>
                  }
                  disabled={true}
                  type="button"
                />
              </div>

              {!isLoggedIn ? (
                <>
                  <div>
                    <Button
                      className="hidden md:flex bg-transparent text-text_white font-medium text-md px-2.5 cursor-pointer"
                      onClick={() => navigate("/sign-in")} // Use navigate here
                      label="Sign in"
                      type="button"
                    />
                  </div>
                  <div>
                    <Button
                      className="cursor-pointer hidden md:flex text-text_steel_blue bg-background_white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      onClick={() => navigate("/create-new-account")}
                      label="Create new account"
                      type="button"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Dropdown
                      menu={{
                        items,
                        onClick,
                      }}
                    >
                      <div
                        className="cursor-pointer hidden md:flex text-text_steel_blue bg-background_white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Space>
                          {username || "User"}
                          <DownOutlined />
                        </Space>
                      </div>
                    </Dropdown>
                    {/* <div
                      className="cursor-pointer hidden md:flex text-text_steel_blue bg-background_white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"                      
                    >
                    {username || "User"} <svg className="mt-1 ms-1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M8.037 11.166L14.5 22.36c.825 1.43 2.175 1.43 3 0l6.463-11.195c.826-1.43.15-2.598-1.5-2.598H9.537c-1.65 0-2.326 1.17-1.5 2.6z"></path></svg>
                    </div> */}
                  </div>
                </>
              )}

              <button
                onClick={toggleMenu} // Toggle menu on button click
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm rounded-lg lg:hidden text-text_white"
                aria-expanded={isMenuOpen ? "true" : "false"} // Set aria-expanded based on menu state
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={isMenuOpen ? "hidden w-6 h-6" : "w-6 h-6"} // Hide/show first svg icon based on menu state
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className={isMenuOpen ? "w-6 h-6" : "hidden w-6 h-6"} // Hide/show second svg icon based on menu state
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div
              className={`${isMenuOpen ? "block" : "hidden"
                } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.id}
                      spy={true}
                      smooth={true}
                      onSetActive={handleSetActive}
                      onClick={toggleMenu} // Close menu on link click
                      className="text-text_white cursor-pointer block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                    >
                      {item.text}
                      {item.id === activeSection ? (
                        <>
                          <div>
                            <img
                              src="/assets/header/navigator_icon.png"
                              alt="navigator_icon"
                              className="absolute top-[60px] w-[40px] h-[20px] hidden md:block lg:block"
                            />
                          </div>
                        </>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className="mt-20">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="mx-auto">
              <img
                src="/assets/paymentconditions/paymentsuccess.png"
                alt="payment success"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="mx-auto">
              <p className="font-extrabold mt-6 font-roboto">
                The payment was successful
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="mx-auto">
              <p className="mt-2 font-roboto text-text_lightdark_grey">
                Thank you for using our application! We are pleased to inform
                you that your order has been successfully paid
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-5">
            <div className="col-start-2">
              <button
                type="button"
                onClick={() => navigate("/")}
                class="bg-white w-full text-black border border-black hover:bg-gray-100 font-medium text-sm px-5 py-2.5 me-2 mb-2"
              >
                Back to Home
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => navigate("/")}
                class="bg-background_steel_blue w-full text-text_white hover:bg-gray-100 font-medium text-sm px-5 py-2.5 me-2 mb-2"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* footer code is here */}
      <footer className="mt-10 w-full py-3 md:py-6 px-10 md:px-20 flex flex-col items-center justify-center bg-background_steel_blue text-text_white">
        <div className="mb-4">
          <img
            src="/assets/footer/logo.png"
            alt="Mashrook Trips"
            className="w-16 md:w-32 h-16 md:h-32"
          />
        </div>
        <div className="my-2 md:my-4">
          <ul className="flex flex-col items-center mt-2 md:mt-4 font-normal md:font-medium md:flex-row md:items-baseline lg:space-x-8 lg:mt-0">
            {footerItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.id}
                  spy={true}
                  smooth={true}
                  onClick={toggleMenu} // Close menu on link click
                  className="text-text_white block cursor-pointer py-1 md:py-2 pr-2 md:pr-4 pl-2 md:pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li
              onClick={() => navigate("/sign-in")}
              className="text-text_white block cursor-pointer py-1 md:py-2 pr-2 md:pr-4 pl-2 md:pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
            >
              Sign in
            </li>
            <li>
              <Button
                className="hidden md:flex cursor-pointer text-text_steel_blue bg-background_white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={() => navigate("/create-new-account")}
                label="Create new account"
                type="button"
              />
            </li>
          </ul>
        </div>
        <div className="mt-4 border-t w-full pt-2 flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="mt-3 md:0">
            Copyright © 2024 AMK or its affiliates
          </div>
          <div className="flex flex-row justify-end items-center">
            <ul className="flex flex-col md:flex-row items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              {footerItemsTwo.map((item, index) => (
                <li key={index} className="mt-3 md:0">
                  <a href={item.href} className="hover:underline me-4 md:me-6">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
      {/* footer code is here */}
    </div>
  );
}
