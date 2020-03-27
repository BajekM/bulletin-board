import React from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';


import { connect } from 'react-redux';
import { getUser } from '../../../redux/postsRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';


import styles from './Header.module.scss';
import { GoogleButton } from '../../common/GoogleButton/GoogleButton';
// import { Button } from '../../common/Button/Button';

const Component = ({className, user}) => (
  <div className={clsx(className, styles.root)}>
    {user === 'logged' || user ==='admin' || user === 'logged author'?
      <div className={styles.buttonsWrapper}>
        <Button variant="contained" color="primary" href="#contained-buttons">
            My posts
        </Button>
        <Button variant="contained" color="primary" href="#contained-buttons">
            Log out
        </Button>
      </div>
      :
      <div className={styles.buttonsWrapper}>
        <GoogleButton />
      </div>
    }
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.string,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
