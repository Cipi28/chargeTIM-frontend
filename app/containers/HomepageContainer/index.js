import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as HomepageContainerActionCreators from './actions';
import './index.css';
import CarCard from '../../components/CarCard';
import {
  Icon,
  Input,
  Button,
  Flex,
  useDisclosure,
  Heading,
  Box,
  Card,
  useColorModeValue,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import * as S from './selectors';
import { store } from '../../store';
import AddCarModal from '../../components/AddCarModal';
import CarDetailsModal from '../../components/CarDetailsModal';
import { isEmpty, isNil } from 'lodash';
import BookingDetailsModal from '../../components/BookingDetailsModal';
import BarChart from '../../components/BarChart';
import ReactApexChart from 'react-apexcharts';
import LineChart from '../../components/LineChart';
import {
  barChartOptionsDailyTraffic,
  lineChartOptionsOverallRevenue,
  pieChartOptions,
} from './constants';

function base64toFile(base64String, filename, contentType) {
  const byteCharacters = atob(base64String); // Decode base64 string
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const file = new File([byteArray], filename, { type: contentType });
  return URL.createObjectURL(file);
}

export function HomepageContainer(props) {
  const { actions } = props;
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);
  const [carItems, setCarItems] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [stations, setStations] = useState([]);
  const [updateErrorMessagesState, setUpdateErrorMessagesState] = useState({});
  const [piChartData, setPieChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [isCarListEmpty, setIsCarListEmpty] = useState(false);

  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const {
      global: { user },
    } = store.getState();
    if (user && user.user) {
      setUserInfo(user.user);
      actions.getUserCars({ userId: user.user.id });

      actions.getChartsDataAction({ userId: user.user.id });
    }
    actions.getStationsAction();

    const handleResize = () => {
      setShowFirstDiv(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const pieChart = {};
    const barChart = {};
    const lineChart = {};

    if (!isNil(props.chartsData)) {
      pieChart.pieChartData = props.chartsData?.pieChartData.data || [];
      pieChart.options = pieChartOptions.options || {};
      pieChart.options.labels =
        props.chartsData?.pieChartData.stationNames || [];
      pieChart.totalBookings =
        props.chartsData?.pieChartData.totalBookings || 0;

      setPieChartData(pieChart);

      barChart.barChartData = [];
      const data = {};
      data.data = props.chartsData?.barChartData.data || [];
      data.name = props.chartsData?.barChartData.days || [];
      barChart.barChartData.push(data);
      barChart.options = barChartOptionsDailyTraffic || {};
      barChart.totalWeekBookings =
        props.chartsData?.barChartData.totalWeekBookings;

      setBarChartData(barChart);

      lineChart.lineChartData = props.chartsData?.lineChartData?.data || [];
      lineChart.options = lineChartOptionsOverallRevenue || {};
      lineChart.totalBookings = props.chartsData?.lineChartData?.totalBookings;

      setLineChartData(lineChart);
    }
  }, [props.chartsData]);

  useEffect(() => {
    setCarItems(props.userCars);
    setStations(props.allStations);

    if (props.userCars.length === 0 && props.carsReturned) {
      setIsCarListEmpty(true);
    }
  }, [props.userCars, props.allStations, props.carsReturned]);

  useEffect(() => {
    setUpdateErrorMessagesState(props.updateErrorMessages);
  }, [props.updateErrorMessages]);

  const deleteErrors = () => {
    setUpdateErrorMessagesState({});
  };

  const addCar = (name, plate, plug_type, image) => {
    setIsCarListEmpty(false);
    actions.addCar({ userId: userInfo.id, name, plate, plug_type, image });
    actions.getUserCars({ userId: userInfo.id });
  };

  const openCarDetails = carIndex => {
    setSelectedCar(carItems[carIndex]);
    setIsOpenEdit(true);
  };

  const deleteCar = carId => {
    actions.deleteCar({ id: carId });
    setCarItems(carItems.filter(car => car.id !== carId));
    actions.getUserCars({ userId: userInfo.id });
  };

  const updateCar = (id, name, plate, plug_type, image) => {
    actions.updateCar({ id, name, plate, plug_type, image });
    actions.getUserCars({ userId: userInfo.id });
  };

  const handleBookButton = carIndex => {
    setSelectedCar(carItems[carIndex]);
    setOpenBookingModal(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {showFirstDiv && <div style={{ width: '240px', flexShrink: 0 }} />}
      <div style={{ width: '100%' }}>
        <Box
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          _before={{
            paddingLeft: '240px',
            content: '""',
            position: 'absolute',
            top: 0,
            left: '10%', // Adjust this value to set the left margin
            width: '90%', // Adjust this value to account for the left margin
            height: '100%',
            bgImage:
              'https://static.vecteezy.com/system/resources/previews/012/848/255/non_2x/electric-vehicle-icon-set-of-ev-illustration-such-as-electric-car-bus-motorcycle-and-other-vector.jpg',
            bgSize: '90%',
            bgPosition: 'calc(50% + 120px) calc(50% - 30px)',
            bgRepeat: 'no-repeat',
            bgAttachment: 'fixed',
            opacity: 0.2,
            zIndex: -999,
          }}
          zIndex={-999}
        >
          {!isEmpty(userInfo) && !userInfo.role && (
            <Box mt={4} ml={7} mr={7} zIndex={1}>
              <Flex justify="center" align="center" mt={10}>
                <Box mb={10}>
                  <Icon
                    mr="4"
                    mt="1"
                    fontSize="30"
                    _groupHover={{
                      color: 'white',
                    }}
                    as={FiSearch}
                  />
                  <Input
                    variant="filled"
                    width={'30rem'}
                    className="search-bar"
                    placeholder="Search Car"
                    value={searchField}
                    onChange={event => {
                      const searchTerm = event.target.value.toLowerCase();
                      setSearchField(event.target.value);
                      setCarItems(
                        props.userCars.filter(carItem =>
                          carItem.name.toLowerCase().includes(searchTerm),
                        ),
                      );
                    }}
                  />
                  <Button
                    ml={8}
                    mb={2}
                    fontSize="sm"
                    rounded="full"
                    bg="blue.300"
                    color="white"
                    boxShadow="lg"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow:
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)',
                    }}
                    _focus={{
                      bg: 'blue.500',
                    }}
                    onClick={onOpen}
                  >
                    Add Car
                    <Icon
                      ml="2"
                      title="filterSurveyTags"
                      fontSize="20"
                      _groupHover={{
                        color: 'white',
                      }}
                      as={FiPlus}
                    />
                  </Button>
                </Box>
              </Flex>
              <Flex alignItems="center" wrap="wrap">
                {carItems.map((car, index) => (
                  <Box p={3} mx={3} mb={12} key={index}>
                    <div className="car-card">
                      <CarCard
                        index={index}
                        id={car.id}
                        plate={car.plate}
                        plugType={car.plug_type}
                        image={car.image}
                        name={car.name}
                        openCarDetails={openCarDetails}
                        deleteCar={deleteCar}
                      />
                    </div>
                  </Box>
                ))}
              </Flex>
              {isEmpty(carItems) && isCarListEmpty && (
                <div>
                  <Heading
                    mt={12}
                    fontSize={'4xl'}
                    fontFamily={'body'}
                    fontWeight={500}
                    align="center"
                    textAlign={'center'}
                  >
                    No cars added yet!
                  </Heading>
                </div>
              )}
            </Box>
          )}
          {!isEmpty(userInfo) && userInfo.role ? (
            <Box>
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                gap="5rem"
              >
                <Box>
                  <Card
                    mt="50px"
                    align="center"
                    direction="column"
                    w="40rem"
                    h="23rem"
                    rounded="2xl"
                    boxShadow="2xl"
                  >
                    <Flex
                      justify="space-between"
                      align="start"
                      px="10px"
                      pt="5px"
                    >
                      <Flex flexDirection="column" align="center">
                        <Text
                          color="secondaryGray.600"
                          fontSize="2xl"
                          fontWeight="500"
                          mt={2}
                          mb={5}
                        >
                          Station Usage Percentage
                        </Text>
                        {!isNil(piChartData) && (
                          <Flex align="center" justify="center">
                            <Text
                              color={textColor}
                              fontSize="2xl"
                              fontWeight="700"
                              lineHeight="100%"
                            >
                              {piChartData.totalBookings}
                            </Text>
                            <Text
                              ms="6px"
                              color="secondaryGray.600"
                              fontSize="sm"
                              fontWeight="500"
                            >
                              Bookings (total)
                            </Text>
                          </Flex>
                        )}
                      </Flex>
                    </Flex>
                    <Box h="20rem" w="35rem" mt="1rem">
                      {!isNil(piChartData) ? (
                        <ReactApexChart
                          options={piChartData.options}
                          series={piChartData.pieChartData}
                          type="pie"
                          width={380}
                        />
                      ) : (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height="12rem"
                        >
                          <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                          />
                        </Box>
                      )}
                    </Box>
                  </Card>
                </Box>
                <Box>
                  <Card
                    mt="50px"
                    align="center"
                    direction="column"
                    w="40rem"
                    h="23rem"
                    rounded="2xl"
                    boxShadow="2xl"
                  >
                    <Flex
                      justify="space-between"
                      align="start"
                      px="10px"
                      pt="5px"
                    >
                      <Flex flexDirection="column" align="center">
                        <Text
                          color="secondaryGray.600"
                          fontSize="2xl"
                          fontWeight="500"
                          mt={2}
                          mb={5}
                        >
                          Weekly Bookings
                        </Text>
                        {!isNil(barChartData) && (
                          <Flex align="center" justify="center">
                            <Text
                              color={textColor}
                              fontSize="2xl"
                              fontWeight="700"
                              lineHeight="100%"
                            >
                              {barChartData.totalWeekBookings}
                            </Text>
                            <Text
                              ms="6px"
                              color="secondaryGray.600"
                              fontSize="sm"
                              fontWeight="500"
                            >
                              Bookings (this week)
                            </Text>
                          </Flex>
                        )}
                      </Flex>
                    </Flex>
                    <Box h="20rem" w="35rem" mt="auto" mb={3}>
                      {!isNil(barChartData) ? (
                        <BarChart
                          chartData={barChartData.barChartData}
                          chartOptions={barChartData.options}
                        />
                      ) : (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height="12rem"
                        >
                          <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                          />
                        </Box>
                      )}
                    </Box>
                  </Card>
                </Box>
              </Flex>
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                gap="5rem"
              >
                <Box>
                  <Card
                    mt="50px"
                    align="center"
                    direction="column"
                    w="86rem"
                    h="23rem"
                    rounded="2xl"
                    boxShadow="2xl"
                  >
                    <Flex
                      justify="space-between"
                      align="start"
                      px="10px"
                      pt="5px"
                    >
                      <Flex flexDirection="column" align="center">
                        <Text
                          color="secondaryGray.600"
                          fontSize="2xl"
                          fontWeight="500"
                          mt={2}
                          mb={5}
                        >
                          Station Usage over time
                        </Text>
                        {!isNil(lineChartData) && (
                          <Flex align="center" justify="center">
                            <Text
                              color={textColor}
                              fontSize="2xl"
                              fontWeight="700"
                              lineHeight="100%"
                            >
                              {lineChartData.totalBookings}
                            </Text>
                            <Text
                              ms="6px"
                              color="secondaryGray.600"
                              fontSize="sm"
                              fontWeight="500"
                            >
                              Bookings (total)
                            </Text>
                          </Flex>
                        )}
                      </Flex>
                    </Flex>
                    <Box h="20rem" w="75rem" mt="auto" mb={3}>
                      {!isNil(lineChartData) ? (
                        <LineChart
                          chartData={lineChartData.lineChartData}
                          chartOptions={lineChartData.options}
                        />
                      ) : (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height="15rem"
                        >
                          <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                          />
                        </Box>
                      )}
                    </Box>
                  </Card>
                </Box>
              </Flex>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </div>
      <AddCarModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        addCar={addCar}
        errors={props.errorMessages}
        successAddCar={props.successAddCar}
      />
      {isOpenEdit && selectedCar && (
        <CarDetailsModal
          setIsOpenEdit={setIsOpenEdit}
          selectedCar={selectedCar}
          updateCar={updateCar}
          errors={updateErrorMessagesState}
          successUpdateCar={props.successUpdateCar}
          deleteErrors={deleteErrors}
        />
      )}
      {openBookingModal && (
        <BookingDetailsModal
          setOpenBookingModal={setOpenBookingModal}
          cars={carItems}
          stations={stations}
          selectedCar={selectedCar}
          userId={userInfo.id}
          userName={userInfo.name}
        />
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  userCars: S.selectUserCars(state),
  allStations: S.selectAllStations(state),
  errorMessages: S.selectErrorMessages(state),
  successAddCar: S.selectSuccessAddCar(state),
  updateErrorMessages: S.selectUpdateErrorMessages(state),
  successUpdateCar: S.selectSuccessUpdateCar(state),
  chartsData: S.selectChartsData(state),
  carsReturned: S.selectCarsReturned(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(HomepageContainerActionCreators, dispatch),
});

const ConnectedHomepageContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(HomepageContainer);

export default ConnectedHomepageContainer;
