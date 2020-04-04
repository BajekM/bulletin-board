import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import {NotFound} from '../NotFound/NotFound';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser, getAll, addNew } from '../../../redux/postsRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostAdd.module.scss';

class Component extends React.Component {

  state = {
    title: '',
    text: '',
    photo: '',
    price: '',
    phone: '',
    location: '',
  }

  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.string,
    posts: PropTypes.array,
    addNewPost: PropTypes.func,
  }

  handleChange(prop, newValue) {
    if (prop === 'title') {
      this.setState(state => (
        {
          title: newValue,
        }
      ));
    } else if (prop === 'text') {
      this.setState(state => (
        {
          text: newValue,
        }
      ));
    } else if (prop === 'photo') {
      this.setState(state => (
        {
          photo: newValue,
        }
      ));
    } else if (prop === 'price') {
      this.setState(state => (
        {
          price: newValue,
        }
      ));
    } else if (prop === 'phone') {
      this.setState(state => (
        {
          phone: newValue,
        }
      ));
    } else if (prop === 'location') {
      this.setState(state => (
        {
          location: newValue,
        }
      ));
    }
  }

  // setDate() {
  //   const now = new Date();
  //   const day = now.getDate();
  //   const month = now.getMonth();
  //   const year = now.getFullYear();

  //   const date = (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + year;
  //   // console.log(date);
  //   return date;
  // }

  render() {
    const {className, user, addNewPost} = this.props;
    const {title, text, photo, phone, price, location} = this.state;
    return (
      <div className={clsx(className, styles.root)}>
        {user === 'logged' || user === 'admin' || user ==='logged author'?
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell className={styles.w40}>Text</TableCell>
                  <TableCell>Photo</TableCell>
                  <TableCell>Data</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <TextField
                      id="newTitle"
                      label="NewTitle"
                      type="text"
                      variant="outlined"
                      defaultValue= {''}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => this.handleChange('title', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextareaAutosize aria-label="minimum height" id="photo" rowsmin={3} placeholder="Content" onChange={(e) => this.handleChange('text', e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <input
                      type="file"
                    />
                  </TableCell>
                  <TableCell className={styles.dataWrapper}>
                    <TextField
                      id="price"
                      label="Price"
                      type="number"
                      inputProps={{ min: '1', max: '10', step: '1' }}
                      defaultValue= {''}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => this.handleChange('price', e.target.value)}
                    />
                    <TextField
                      id="phone"
                      label="Phone"
                      type="text"
                      defaultValue= {''}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => this.handleChange('phone', e.target.value)}
                    />
                    <TextField
                      id="location"
                      label="Location"
                      type="text"
                      defaultValue= {''}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => this.handleChange('location', e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button className={styles.add} variant="outlined" color="primary"  onClick={
              () => addNewPost({
                author: 'Me',
                title,
                text,
                photo,
                price,
                phone,
                location,
                created: new Date(),
                updated: new Date(),
                status: 'published',
              })
            }>
            + Add
            </Button>
          </Paper>
          :
          <NotFound />
        }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: getUser(state),
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  // addBulletin: obj => dispatch(addPost(obj)),
  addNewPost: (obj) => dispatch(addNew(obj)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
