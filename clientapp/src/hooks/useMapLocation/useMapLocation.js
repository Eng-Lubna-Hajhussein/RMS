function useMapLocation() {
  // const [location, setLocation] = useState({});
  const getCoordinate = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (error) => {
          console.log(error);
          reject(false);
        }
      );
    });
  };

  const getLocation = async () => {
    const coord = await getCoordinate();
    return { long: coord.longitude, lat: coord.latitude };
  };

  const getZDirection = (lat1, long1, lat2, long2) => {
    let p1 = Math.pow(Math.pow(lat1, 2) + Math.pow(long1, 2), 0.5);
    let p2 = Math.pow(Math.pow(lat2, 2) + Math.pow(long2, 2), 0.5);
    return (Math.abs(p2 - p1) * 157) / (70 / 60);
  };


  return { mapLocation:{getLocation:getLocation,getZDirection:getZDirection} };
}

export default useMapLocation;
