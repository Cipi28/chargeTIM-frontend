import React, { useEffect, useState } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: null, lng: null },
  });

  const onSuccess = location => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = error => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError); // For first location return
    // const updateLocation = () => {
    //   navigator.geolocation.getCurrentPosition(onSuccess, onError);
    // };
    //
    // const intervalId = setInterval(updateLocation, 10000); // Update location every 5 seconds
    // return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return location;
};
export default useGeolocation;
