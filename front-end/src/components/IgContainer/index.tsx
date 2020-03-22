import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../utils/types';
import Footer from '../Footer';
import Nav from '../Nav';
import './style.scss';

interface Props {
    children: any;
    auth: { isAuthenticated: boolean, user: object};
}

class IgContainer extends Component<Props> {
    public render() {
        const { isAuthenticated } = this.props.auth;
        return(
            <div className='igContainer'>
                {isAuthenticated && <Nav/>}
                <div>
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(IgContainer);
