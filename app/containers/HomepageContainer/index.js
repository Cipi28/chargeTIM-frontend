import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as HomepageContainerActionCreators from './actions';
import './index.css';

export function HomepageContainer(props) {
  const { actions, isLoading } = props;
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);

  useEffect(() => {
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
        <div style={{ width: '240px' }}>
        </div>
      )}
      <div>
        {/*here will go the content of the homepage*/}
        <h1>Welcome to the homepage</h1>
        {isLoading ? <p>Loading...</p> : <p>Homepage content</p>}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: false,
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
