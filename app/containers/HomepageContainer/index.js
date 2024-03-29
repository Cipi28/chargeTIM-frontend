
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as HomepageContainerActionCreators from './actions';

export function HomepageContainer(props) {
  const { actions } = props;


  return (
    <div>
      <h1>HomePage!!!!</h1>
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
