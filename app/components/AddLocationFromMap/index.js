import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useColorModeValue,
  Button,
  Flex,
  Box,
} from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

function AddLocationFromMap({ setIsMapModalOpen, saveCoordinates }) {
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [markerCoordinates, setMarkerCoordinates] = useState(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={true}
        onClose={() => {
          setIsMapModalOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent maxWidth="50rem" width="70%">
          <ModalHeader>
            <Flex alignItems="center">
              <FaMapMarkerAlt size={30} mt={8} />
              <Box ml={3}>Select the location of your station on the map</Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <Flex alignItems="center" justifyContent="center">
              <Box mt={2}>
                <div style={{ height: '50vh', width: '80vh' }}>
                  <APIProvider
                    apiKey="AIzaSyBfvGY364KnQcQCaKGVGtRJHRIELiZfC7o"
                    key={'map2'}
                  >
                    <Map
                      key={'map2'}
                      defaultCenter={{
                        lat: 45.7487016698992,
                        lng: 21.20903393565148,
                      }}
                      defaultZoom={12}
                      mapId="264135071e31772e"
                      onClick={e => {
                        setMarkerCoordinates(e.detail.latLng);
                      }}
                    >
                      {markerCoordinates && (
                        <AdvancedMarker
                          key={'userLocation'}
                          position={markerCoordinates}
                        />
                      )}
                    </Map>
                  </APIProvider>
                </div>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              rounded={'xl'}
              ml={3}
              width="120px"
              bg={useColorModeValue('#b2d8d8', 'gray.900')}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              onClick={() => {
                saveCoordinates(markerCoordinates);
                setIsMapModalOpen(false);
              }}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddLocationFromMap;
