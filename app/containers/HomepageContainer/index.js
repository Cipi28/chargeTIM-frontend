import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import * as HomepageContainerActionCreators from './actions';
import './index.css';
import CarCard from '../../components/CarCard';
import {Icon, Input, Button, Flex, useDisclosure, Heading} from '@chakra-ui/react';
import {FiSearch, FiPlus} from 'react-icons/fi';
import * as S from './selectors';
import {store} from '../../store';
import AddCarModal from '../../components/AddCarModal';
import CarDetailsModal from '../../components/CarDetailsModal';
import {isEmpty} from "lodash";


export function HomepageContainer(props) {
  const {actions} = props;
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);
  const [carItems, setCarItems] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(() => {
    const {
      global: {user},
    } = store.getState();
    if (user && user.user) {
      setUserInfo(user.user);
      actions.getUserCars({userId: user.user.id});
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
    setCarItems(props.userCars);
  }, [props.userCars]);

  function base64toFile(base64String, filename, contentType) {
    const byteCharacters = atob(base64String); // Decode base64 string
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new File([byteArray], filename, {type: contentType});
    return URL.createObjectURL(file);
  }

  const addCar = (name, plate, plug_type, image) => {
    actions.addCar({userId: userInfo.id, name, plate, plug_type, image});
    actions.getUserCars({userId: userInfo.id});
  };

  const openCarDetails = carIndex => {
    setSelectedCar(carItems[carIndex]);
    setIsOpenEdit(true);
  };

  const deleteCar = carId => {
    actions.deleteCar({id: carId});
    setCarItems(carItems.filter(car => car.id !== carId));
    actions.getUserCars({userId: userInfo.id});
    setIsOpenEdit(false);
  };

  const updateCar = (id, name, plate, plug_type, image) => {
    actions.updateCar({id, name, plate, plug_type, image});
    actions.getUserCars({userId: userInfo.id});
    setIsOpenEdit(false);
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {' '}
      {/* Added justifyContent: 'center' */}
      {showFirstDiv && (
        <div style={{width: '240px', flexShrink: 0}}>
          {' '}
          {/* Added flexShrink: 0 */}
          {/* Content for the first div */}
        </div>
      )}
      <div className="car-list-container">
        <div className="car-list">
          <div className="input-wrapper">
            {' '}
            {/* Added wrapper div for Input */}
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
            <Flex justifyContent="center" alignItems="center" ml={20}>
              <Button
                fontSize="sm"
                rounded="full"
                bg="blue.400"
                color="white"
                boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                _hover={{
                  bg: 'blue.500',
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
            </Flex>
          </div>
          {carItems.map((car, index) => (
            <React.Fragment key={index}>
              <div className="car-card">
                <CarCard
                  index={index}
                  plate={car.plate}
                  plugType={car.plug_type}
                  image={base64toFile(car.image, 'carImage', 'jpeg')}
                  name={car.name}
                  openCarDetails={openCarDetails}
                />
              </div>
            </React.Fragment>
          ))}
          {
            isEmpty(carItems) &&
            <div>
              <Heading fontSize={'3xl'} fontFamily={'body'} fontWeight={500} align="center">
                No cars added yet
              </Heading>
            </div>
          }
        </div>
      </div>
      <AddCarModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        addCar={addCar}
      />
      {(isOpenEdit && selectedCar) && <CarDetailsModal
        setIsOpenEdit={setIsOpenEdit}
        selectedCar={selectedCar}
        deleteCar={deleteCar}
        updateCar={updateCar}
      />}
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: false,
  userCars: S.selectUserCars(state),
  // errorLoading: selectError(state),
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
