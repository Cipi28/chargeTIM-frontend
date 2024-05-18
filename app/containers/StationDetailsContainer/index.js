import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import * as StationDetailsContainerActionCreators from './actions';
import './index.css';
import {store} from '../../store';

export function StationDetailsContainer(props) {
  const {actions} = props;
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);

  const stationId = props.match.params.stationId;
  console.log('stationId', stationId, props);


  useEffect(() => {
    const {
      global: {user},
    } = store.getState();
    if (user && user.user) {
      setUserInfo(user.user);
      // actions.getStation({id: stationId});
    }

    const handleResize = () => {
      setShowFirstDiv(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // useEffect(() => {
  //   setCarItems(props.userCars);
  // }, [props.userCars]);

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
            HElooooooooooooooooooooooooooo
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: false,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(StationDetailsContainerActionCreators, dispatch),
});

const ConnectedStationDetailsContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(StationDetailsContainer);

export default ConnectedStationDetailsContainer;
