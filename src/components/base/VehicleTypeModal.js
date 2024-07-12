import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Heading from "../base/Heading";
import { useSelector } from "react-redux";
import { Input } from "antd";

export default function VehicleTypeModal({vehicleTypeName, setVehicleTypeName}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchText, setSearchText] = useState("");
  // const [vehicleTypeName, setVehicleTypeName] = useState(""); // State to store selected vehicle type name
  const { vehicleTypes } = useSelector((state) => state.vehicleTypes);
  // console.log("vehicleTypeName me kiya ha?", vehicleTypeName);

  function handleMouseEnter(index) {
    setHoveredIndex(index);
  }

  function handleMouseLeave() {
    setHoveredIndex(null);
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleSelectVehicleType = (vehicleName) => {
    setVehicleTypeName(vehicleName); // Store selected vehicle type name
    setIsModalOpen(false); // Close modal after selecting a vehicle type
  };

  const filteredVehicleTypes = vehicleTypes?.data.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <button
        onClick={openModal}
        className="block w-full bg-background_white text-black text-left font-medium text-sm px-5 py-2.5 border-b"
        type="button"
      >
        {vehicleTypeName ? vehicleTypeName : 'Select Vehicle Type'}
      </button>

      {isModalOpen && (
        <div
          id="extralarge-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-7xl max-h-full">
            <div className="relative bg-background_white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                <h3 className="text-xl text-text_white font-medium text-gray-900 dark:text-white">
                  Select Your Vehicle Type
                </h3>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-gray-400 bg-transparent text-black hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="extralarge-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <Input.Search
                  placeholder="Search vehicle types"
                  onChange={handleSearch}
                  value={searchText}
                  allowClear
                />
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredVehicleTypes &&
                      filteredVehicleTypes.map((vehicle, index) => {
                        const isHovered = index === hoveredIndex;

                        const cardClasses = isHovered
                          ? "bg-background_steel_blue"
                          : "bg-background_grey";

                        return (
                          <div
                            key={index}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() =>
                              handleSelectVehicleType(vehicle.name)
                            } // Handle vehicle type selection
                            className={`h-auto w-full md:mx-2 mt-2 rounded-lg px-6 py-10 transition-all duration-300 ${cardClasses}`}
                            style={{ cursor: "pointer" }} // Add pointer cursor for clickable effect
                          >
                            <div>
                              <Heading
                                title={`${vehicle.name} Car`}
                                className={`text-lg transition-all duration-300 ${
                                  isHovered ? "text-text_white" : "text-black"
                                }`}
                              />
                            </div>
                            <div
                              className={`text-gray-200 text-sm ${
                                isHovered ? "text-text_white" : "text-black"
                              }`}
                            >
                              {vehicle.short_name}
                            </div>
                            <div className="w-full flex flex-row justify-center items-center">
                              <img
                                src={vehicle.image}
                                alt={vehicle.image}
                                style={{ width: "210px", height: "107px" }}
                              />
                            </div>
                            <hr />

                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                              <div
                                className={`p-2 flex flex-col justify-center items-center rounded-md text-gray-200 text-center text-sm ${
                                  isHovered
                                    ? "bg-text_white text-background_steel_blue"
                                    : "bg-background_steel_blue text-text_white"
                                }`}
                              >
                                Available Seats
                                <div className="flex flex-row justify-center items-center">
                                  <div>
                                    <Icon
                                      icon="mdi:user"
                                      width="1.2em"
                                      height="1.2em"
                                      className={`${
                                        isHovered
                                          ? "bg-text_white text-background_steel_blue"
                                          : "bg-background_steel_blue text-text_white"
                                      }`}
                                    />
                                  </div>
                                  <div
                                    className={`mr-2 ${
                                      isHovered
                                        ? "bg-text_white text-background_steel_blue"
                                        : "bg-background_steel_blue text-text_white"
                                    }`}
                                  >
                                    {vehicle.seats}
                                  </div>
                                </div>
                              </div>

                              <div
                                className={`p-2 flex flex-col justify-center items-center rounded-md text-gray-200 text-center text-sm ${
                                  isHovered
                                    ? "bg-text_white text-background_steel_blue"
                                    : "bg-background_steel_blue text-text_white"
                                }`}
                              >
                                Luggage
                                <div className="flex flex-row justify-center items-center">
                                  <div>
                                    <Icon
                                      icon="iconamoon:shopping-bag-thin"
                                      width="1.2em"
                                      height="1.2em"
                                      className={`${
                                        isHovered
                                          ? "bg-text_white text-background_steel_blue"
                                          : "bg-background_steel_blue text-text_white"
                                      }`}
                                    />
                                  </div>
                                  <div
                                    className={`mr-2 ${
                                      isHovered
                                        ? "bg-text_white text-background_steel_blue"
                                        : "bg-background_steel_blue text-text_white"
                                    }`}
                                  >
                                    {vehicle.luggage}
                                  </div>
                                </div>
                              </div>

                              <div
                                className={`p-2 flex flex-col justify-center items-center rounded-md text-gray-200 text-center text-sm ${
                                  isHovered
                                    ? "bg-text_white text-background_steel_blue"
                                    : "bg-background_steel_blue text-text_white"
                                }`}
                              >
                                {vehicle.driver ? "Driver" : "No-Driver"}
                                <div className="flex flex-row justify-center items-center">
                                  <div>
                                    <Icon
                                      icon="healthicons:truck-driver"
                                      width="1.2em"
                                      height="1.2em"
                                      className={`${
                                        isHovered
                                          ? "bg-text_white text-background_steel_blue"
                                          : "bg-background_steel_blue text-text_white"
                                      }`}
                                    />
                                  </div>
                                  <div
                                    className={`mr-2 ${
                                      isHovered
                                        ? "bg-text_white text-background_steel_blue"
                                        : "bg-background_steel_blue text-text_white"
                                    }`}
                                  >
                                    {vehicle.driver}
                                  </div>
                                </div>
                              </div>

                              <div
                                className={`p-2 flex flex-col justify-center items-center rounded-md text-gray-200 text-center text-sm ${
                                  isHovered
                                    ? "bg-text_white text-background_steel_blue"
                                    : "bg-background_steel_blue text-text_white"
                                }`}
                              >
                                {vehicle.wifi ? "Wifi" : "No-Wifi"}
                                <div className="flex flex-row justify-center items-center">
                                  <div>
                                    <Icon
                                      icon={
                                        vehicle.wifi
                                          ? "material-symbols:wifi-sharp"
                                          : "clarity:no-wifi-solid"
                                      }
                                      width="1.2em"
                                      height="1.2em"
                                      className={`${
                                        isHovered
                                          ? "bg-text_white text-background_steel_blue"
                                          : "bg-background_steel_blue text-text_white"
                                      }`}
                                    />
                                  </div>
                                  <div
                                    className={`mr-2 ${
                                      isHovered
                                        ? "bg-text_white text-background_steel_blue"
                                        : "bg-background_steel_blue text-text_white"
                                    }`}
                                  >
                                    {vehicle.wifi}
                                  </div>
                                </div>
                              </div>

                              <div
                                className={`p-2 flex flex-col justify-center items-center rounded-md text-gray-200 text-center text-sm ${
                                  isHovered
                                    ? "bg-text_white text-background_steel_blue"
                                    : "bg-background_steel_blue text-text_white"
                                }`}
                              >
                                {vehicle.tracking_system
                                  ? "Vehicle tracking system"
                                  : "No Vehicle tracking system"}
                                <div className="flex flex-row justify-center items-center">
                                  <div>
                                    <Icon
                                      icon="streamline:navigation-arrow-on"
                                      width="1.2em"
                                      height="1.2em"
                                      className={`${
                                        isHovered
                                          ? "bg-text_white text-background_steel_blue"
                                          : "bg-background_steel_blue text-text_white"
                                      }`}
                                    />
                                  </div>
                                  <div
                                    className={`mr-2 ${
                                      isHovered
                                        ? "bg-text_white text-background_steel_blue"
                                        : "bg-background_steel_blue text-text_white"
                                    }`}
                                  >
                                    {vehicle.tracking_system}
                                  </div>
                                </div>
                              </div>

                              <div
                                className={`p-2 flex flex-col justify-center items-center rounded-md text-gray-200 text-center text-sm ${
                                  isHovered
                                    ? "bg-text_white text-background_steel_blue"
                                    : "bg-background_steel_blue text-text_white"
                                }`}
                              >
                                {vehicle.security_camera
                                  ? "Security cameras"
                                  : "No Security cameras"}
                                <div className="flex flex-row justify-center items-center">
                                  <div>
                                    <Icon
                                      icon="ph:security-camera-thin"
                                      width="1.2em"
                                      height="1.2em"
                                      className={`${
                                        isHovered
                                          ? "bg-text_white text-background_steel_blue"
                                          : "bg-background_steel_blue text-text_white"
                                      }`}
                                    />
                                  </div>
                                  <div
                                    className={`mr-2 ${
                                      isHovered
                                        ? "bg-text_white text-background_steel_blue"
                                        : "bg-background_steel_blue text-text_white"
                                    }`}
                                  >
                                    {vehicle.security_camera}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}