'use client';

import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import {
  APIProvider,
  InfoWindow,
  Map,
  AdvancedMarker,
} from '@vis.gl/react-google-maps';
import {
  GridItem,
  Grid,
  Button,
  useColorModeValue,
  Heading,
  Text,
} from '@chakra-ui/react';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import {store} from '../../store';
import * as MapContainerActionCreators from './actions';
import GlobalAPI from '../../components/Utils/GlobalAPI';

export function MapContainer(props) {
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);
  const position = {lat: 45.76132373523073, lng: 21.24378051068943};
  const [publicStations, setPublicStations] = useState([]);
  const [isOpenUserLocation, setIsOpenUserLocation] = useState(false);
  const [activeMarkerStation, setActiveMarkerStation] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);

  const {actions} = props;

  const GetNearByPlaces = () => {
    const data = {
      includedTypes: ['electric_vehicle_charging_station'],
      maxResultCount: 20,
      locationRestriction: {
        circle: {
          center: {
            latitude: position.lat,
            longitude: position.lng,
          },
          radius: 4000.0,
        },
      },
    };
    GlobalAPI.NewNearByPlace(data).then(response => {
      setPublicStations(response.data.places);
    });
  };

  useEffect(() => {
    GetNearByPlaces();

    // todo: add location change in order to get new places every time the user moves
  }, []);

  useEffect(() => {
    const {
      global: {user},
    } = store.getState();

    if (user && user.user) {
      actions.getUserFavouritePublicStations({userId: user.user.id});
    }

    const handleResize = () => {
      setShowFirstDiv(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const splitStringByComma = inputString =>
    inputString.split(',').map(element => element.trim());

  return (
    <div style={{display: 'flex'}}>
      {showFirstDiv && (
        <div style={{width: '240px', flexShrink: 0}}>
          {' '}
          {/* Added flexShrink: 0 */}
          {/* Content for the first div */}
        </div>
      )}
      <div style={{height: '80vh', width: '100%', marginTop: '60px'}}>
        <APIProvider apiKey="AIzaSyBfvGY364KnQcQCaKGVGtRJHRIELiZfC7o">
          <Map
            defaultCenter={position}
            defaultZoom={13}
            mapId="264135071e31772e"
          >
            <AdvancedMarker
              position={position}
              onClick={() => setIsOpenUserLocation(true)}
            />
            {isOpenUserLocation && (
              <InfoWindow
                position={position}
                onCloseClick={() => setIsOpenUserLocation(false)}
              >
                <div>
                  <h1>InfoWindow</h1>
                </div>
              </InfoWindow>
            )}
            {publicStations.map((station, index) => {
              const position = {
                lat: station.location?.latitude,
                lng: station.location?.longitude,
              };

              const adressLines = splitStringByComma(station.formattedAddress);
              return (
                <>
                  <AdvancedMarker
                    key={index}
                    position={position}
                    title={station.displayName.text}
                    lable={station.displayName.text}
                    onClick={() => {
                      setSelectedStation(station);
                      setActiveMarkerStation(index);
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/256/12338/12338156.png"
                      width={50}
                      height={50}
                    />
                  </AdvancedMarker>
                  {activeMarkerStation === index && (
                    <InfoWindow
                      key={index}
                      position={position}
                      onCloseClick={() => setActiveMarkerStation(null)}
                    >
                      <div>
                        <Grid
                          key={index}
                          h="200px"
                          templateRows="repeat(1, 1fr)"
                          templateColumns="repeat(3, 1fr)"
                          gap={4}
                        >
                          <GridItem
                            colSpan={2}
                            // bg='papayawhip'
                          >
                            <Heading
                              fontSize="md"
                              fontFamily="body"
                              fontWeight={500}
                            >
                              {station.displayName.text}
                            </Heading>
                            {adressLines.map((line, index) => (
                              <Text fontSize="sm" mt={2}>
                                {line}
                              </Text>
                            ))}
                            {/* {station.currentOpeningHours.weekdayDescriptions && ( */}
                            {/*  <> */}
                            {/*    <Text fontSize={'sm'} mt={2}> */}
                            {/*      Orar: */}
                            {/*    </Text> */}
                            {/*    {station.currentOpeningHours.weekdayDescriptions.map((day, index) => ( */}
                            {/*      <Text fontSize={'sm'} key={index}> */}
                            {/*        {day} */}
                            {/*      </Text> */}
                            {/*    ))} */}
                            {/*  </> */}
                            {/* )} */}
                          </GridItem>
                          <GridItem
                            colSpan={1}
                            // bg='papayawhip'
                          >
                            <div align="right">
                              {/* <StarIcon sx={{color: "#ff8833"}} fontSize="large"/> */}
                              <StarBorderOutlinedIcon
                                sx={{color: '#ff8833'}}
                                fontSize="large"
                                lable="add to favourites"
                                onClick={() => console.log('adfavourites')}
                              />
                            </div>
                          </GridItem>
                          <GridItem
                            colSpan={3}
                            rowSpan={0.5}
                            // bg='tomato'
                          >
                            <div align="center">
                              <Button
                                mr={3}
                                bg={useColorModeValue('#FFFFFF', 'gray.900')}
                                variant="outline"
                                rounded="md"
                                _hover={{
                                  transform: 'translateY(-2px)',
                                  boxShadow: 'lg',
                                }}
                                as="a"
                                href="#"
                              >
                                Details
                              </Button>
                              <Button
                                ml={3}
                                bg={useColorModeValue('#151f21', 'gray.900')}
                                color="white"
                                rounded="md"
                                _hover={{
                                  transform: 'translateY(-2px)',
                                  boxShadow: 'lg',
                                }}
                              >
                                Book now
                              </Button>
                            </div>
                          </GridItem>
                        </Grid>
                      </div>
                    </InfoWindow>
                  )}
                </>
              );
            })}
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
