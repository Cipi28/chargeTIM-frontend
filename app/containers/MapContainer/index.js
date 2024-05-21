'use client';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
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
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { store } from '../../store';
import * as MapContainerActionCreators from './actions';
import GlobalAPI from '../../components/Utils/GlobalAPI';
import * as S from './selectors';

export function MapContainer(props) {
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);
  const position = { lat: 45.76132373523073, lng: 21.24378051068943 };
  const [stationsInfo, setStationsInfo] = useState([]);
  const [isOpenUserLocation, setIsOpenUserLocation] = useState(false);
  const [activeMarkerStation, setActiveMarkerStation] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [favoriteStations, setFavoriteStations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const { actions } = props;

  useEffect(() => {
    const {
      global: { user },
    } = store.getState();

    GetNearByPlaces();

    if (user && user.user) {
      setCurrentUser(user.user);
      actions.getUserFavouriteStationsIndex({ userId: user.user.id });
    }

    const handleResize = () => {
      setShowFirstDiv(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setStationsInfo(props.stations);
    setFavoriteStations(props.favouriteStations);
  }, [props.stations, props.favouriteStations]);

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
      const stationsForSave = getNecessaryProps(response.data.places);
      actions.saveStations({ stations: stationsForSave });
    });
  };

  const getNecessaryProps = places => {
    return places.map(place => {
      return {
        publicId: place.id,
        name: place.displayName.text,
        adress: place.formattedAddress,
        latitude: parseFloat(place.location.latitude),
        longitude: parseFloat(place.location.longitude),
        image: place?.photos
          ? 'https://places.googleapis.com/v1/' +
            place?.photos[0]?.name +
            '/media?key=' +
            'AIzaSyBfvGY364KnQcQCaKGVGtRJHRIELiZfC7o' +
            '&maxHeightPx=800&maxWidthPx=1200'
          : null,
        phone: place.nationalPhoneNumber || null,
        openPeriods: 'encode currentOpeningHours.periods' || null,
        mapsURL: place.googleMapsUri || null,
        websiteURL: place.websiteUri || null,
        rating: place.rating || null,
        raitingCount: place.userRatingCount || null,
        isPublic: true,
      };
    });
  };

  const splitStringByComma = inputString =>
    inputString.split(',').map(element => element.trim());

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
            {stationsInfo.map((station, index) => {
              const position = {
                lat: station.latitude,
                lng: station.longitude,
              };

              const adressLines = splitStringByComma(station.adress);
              return (
                <>
                  <AdvancedMarker
                    key={index}
                    position={position}
                    title={station.name}
                    lable={station.name}
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
                              {station.name}
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
                              {favoriteStations.includes(station.id) ? (
                                <StarOutlinedIcon
                                  sx={{ color: '#ff8833' }}
                                  fontSize="large"
                                  lable="remove from favourites"
                                  onClick={() => {
                                    actions.deleteFavouriteStation({
                                      userId: currentUser.id,
                                      stationId: station.id,
                                    });
                                    setFavoriteStations(
                                      favoriteStations.filter(
                                        item => item !== station.id,
                                      ),
                                    );
                                  }}
                                />
                              ) : (
                                <StarBorderOutlinedIcon
                                  sx={{ color: '#ff8833' }}
                                  fontSize="large"
                                  lable="add to favourites"
                                  onClick={() => {
                                    actions.addStationToFavourites({
                                      userId: currentUser.id,
                                      stationId: station.id,
                                    });
                                    setFavoriteStations([
                                      ...favoriteStations,
                                      station.id,
                                    ]);
                                  }}
                                />
                              )}
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
  // errorLoading: selectError(state),
  stations: S.selectStations(state),
  favouriteStations: S.selectFavouriteStations(state),
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
