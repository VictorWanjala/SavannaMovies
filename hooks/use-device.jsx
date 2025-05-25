import { useLayoutEffect, useState } from "react";

function useDevice() {
  const [device, setDevice] = useState("lg"); // Default value

  const getDeviceSize = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 768) {
        return "sm";
      } else if (width >= 768 && width < 992) {
        return "md";
      } else {
        return "lg";
      }
    }
    return "lg"; // Default for server-side
  };

  const handleResize = () => {
    setDevice(getDeviceSize());
  };

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return device;
}

export default useDevice;
