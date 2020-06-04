import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../utils/types';
import Footer from '../Footer';
import Nav from '../Nav';
import './style.scss';

interface Props {
  children: JSX.Element;
  auth: { isAuthenticated: boolean; user: object };
}

const IgContainer = (props: Props) => {
  const {
    children,
    auth: { isAuthenticated },
  } = props;

  return (
    <div className='igContainer'>
      {isAuthenticated && <Nav />}
      <div>{children}</div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(IgContainer);
