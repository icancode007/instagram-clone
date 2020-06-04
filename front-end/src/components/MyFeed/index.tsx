import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../utils/types';

interface Props extends RouteComponentProps {
  auth: { isAuthenticated: boolean; user: object };
}

class MyFeed extends Component<Props> {
  componentDidMount() {
    const {
      auth: { isAuthenticated },
      history,
    } = this.props;

    if (!isAuthenticated) {
      history.push('/');
    }
  }

  render() {
    return (
      <>
        <h1> My Feed </h1>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MyFeed);
