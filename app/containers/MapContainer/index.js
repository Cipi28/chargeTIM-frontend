'use client';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import * as MapContainerActionCreators from './actions';
import GlobalAPI from '../../components/Utils/GlobalAPI';

export function MapContainer(props) {
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);
  const position = { lat: 45.76132373523073, lng: 21.24378051068943 };
  const [stationInfo, setStationInfo ] = useState({});

  const GetNearByPlaces = () => {
    const data = {
      includedTypes: ['electric_vehicle_charging_station'],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: position.lat,
            longitude: position.lng,
          },
          radius: 1000.0,
        },
      },
    };
    GlobalAPI.NewNearByPlace(data).then(response => {
      console.log("cipi", response);
      setStationInfo(response.data.places);
    });
  };

  useEffect(() => {
    GetNearByPlaces();

    //todo: add location change in order to get new places every time the user moves
  }, []);

  useEffect(() => {
    // const {
    //   global: { user },
    // } = store.getState();
    // if ( user && user.user ) {
    //   actions.getUserCars({ userId: user.user.id });
    // }

    const handleResize = () => {
      setShowFirstDiv(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {showFirstDiv && (
        <div style={{ width: '240px', flexShrink: 0 }}>
          {' '}
          {/* Added flexShrink: 0 */}
          {/* Content for the first div */}
        </div>
      )}
      <div style={{ height: '80vh', width: '100%', marginTop: '60px' }}>
        <APIProvider apiKey="AIzaSyBfvGY364KnQcQCaKGVGtRJHRIELiZfC7o">
          <Map defaultCenter={position} defaultZoom={13}>
            <Marker position={position} />
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  // isLoading: selectIsLoading(state),
  // errorLoading: selectError(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(MapContainerActionCreators, dispatch),
});

const ConnectedMapContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(MapContainer);
export default ConnectedMapContainer;
