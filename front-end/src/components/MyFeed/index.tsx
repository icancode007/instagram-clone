import React, { Component } from 'react';
import { connect } from 'react-redux';
import {RouteComponentProps} from 'react-router';
import { RootState } from '../../utils/types';

interface Props extends RouteComponentProps {
    auth: { isAuthenticated: boolean, user: object };
}

class MyFeed extends Component <Props> {

    componentDidMount() {
       if (!this.props.auth.isAuthenticated) {
           this.props.history.push('/');
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
    auth: state.auth
});

export default connect(mapStateToProps)(MyFeed);
