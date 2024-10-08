import React, { useState, useEffect } from "react";
import { Link, Events, scrollSpy } from "react-scroll";
import { CiGlobe } from "react-icons/ci";
import Button from "../base/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import { signOutRequest } from "../../redux/actions/authActions";
import PaymentSuccessLogo from '../../assets/payment-logos/paymentSuccessLogo.png'



export default function PaymentSuccess() {
    const API_BASE_URL = process.env.REACT_APP_BASE_URL_AMK_TEST;
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const username = useSelector((state) => state.auth.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

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
                navigate("/mashrouk-new-ui/my-profile");
                break;
            case "2":
                navigate("/mashrouk-new-ui/my-bookings");
                break;
            case "3":
                message.success(`Logged out`);
                dispatch(signOutRequest());
                navigate("/mashrouk-new-ui/");
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


    return (
        <div>
            <header className="fixed top-0 left-0 w-full z-50">
                {" "}
                {/* Make header fixed */}
                <nav className="bg-background_steel_blue md:h-20 lg:h-20 px-4 lg:px-20 py-2.5 dark:bg-gray-800">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl md:h-full lg:h-full">
                        <button onClick={() => navigate("/mashrouk-new-ui/")} className="flex items-center">
                            <img
                                src="./assets/header/logo.png"
                                className="w-14 h-14 sm:h-14 my-2"
                                alt="Camelo Logo"
                            />
                        </button>
                        <div className="flex flex-row justify-center items-baseline lg:order-2">
                            <div>
                                <Button
                                    className="text-text_white font-medium text-md mr-2 hidden md:flex"
                                    // onClick={() =>
                                    //     (window.location.href = "http://localhost:3000/#")
                                    // }
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
                                            onClick={() => navigate("/mashrouk-new-ui/sign-in")} // Use navigate here
                                            label="Sign in"
                                            type="button"
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            className="cursor-pointer hidden md:flex text-text_steel_blue bg-background_white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                            onClick={() => navigate("/mashrouk-new-ui/create-new-account")}
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
                onClick={handleLogout}
              >
                <Space>
                  Logout
                  <DownOutlined />
                </Space>
              </div> */}
                                    </div>
                                </>
                            )}

                            <button
                                onClick={toggleMenu}
                                data-collapse-toggle="mega-menu-full"
                                type="button"
                                className="inline-flex justify-center items-center p-2 ml-1 w-10 h-10 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="mega-menu-full"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div
                            id="mega-menu-full"
                            className={`${isMenuOpen ? "block" : "hidden"
                                } justify-between items-center w-full text-md md:flex md:w-auto md:order-1`}
                        >
                            <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0 text-text_white text-md">
                                {menuItems.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            activeClass="active"
                                            to={item.id}
                                            spy={true}
                                            smooth={true}
                                            duration={500}
                                            onSetActive={handleSetActive}
                                            className={`block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:text-primary-700 md:p-0 dark:text-white cursor-pointer ${activeSection === item.id ? "active" : ""
                                                }`}
                                        >
                                            {item.text}
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
                            <img src={PaymentSuccessLogo} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="mx-auto">
                            <p className="font-extrabold mt-6 font-roboto">The payment was successful</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="mx-auto">
                            <p className="mt-2 font-roboto text-text_lightdark_grey">Thank you for using our application! We are pleased to inform you that your order has been successfully paid</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-3 mt-5">
                        <div className="col-start-2">
                            <button type="button" onClick={() => navigate('/mashrouk-new-ui/')} class="bg-white w-full text-black border border-black hover:bg-gray-100 font-medium text-sm px-5 py-2.5 me-2 mb-2">
                                Back to Home
                            </button>
                        </div>
                        <div>
                            <button type="button" onClick={() => navigate('/mashrouk-new-ui/')} class="bg-background_steel_blue w-full text-text_white hover:bg-gray-100 font-medium text-sm px-5 py-2.5 me-2 mb-2">
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
                        src="./assets/footer/logo.png"
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
                            onClick={() => navigate("/mashrouk-new-ui/sign-in")}
                            className="text-text_white block cursor-pointer py-1 md:py-2 pr-2 md:pr-4 pl-2 md:pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                        >
                            Sign in
                        </li>
                        <li>
                            <Button
                                className="hidden md:flex cursor-pointer text-text_steel_blue bg-background_white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                onClick={() => navigate("/mashrouk-new-ui/create-new-account")}
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
