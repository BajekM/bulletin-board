import React from 'react';
import PropTypes from 'prop-types';

import {NotFound} from '../NotFound/NotFound';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import SaveIcon from '@material-ui/icons/Save';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser, modifyPost, getAll, fetchPublished } from '../../../redux/postsRedux';

import styles from './PostEdit.module.scss';

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
    modify: PropTypes.func,
    match: PropTypes.object,
    posts: PropTypes.array,
    fetchPublishedPosts: PropTypes.func,
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

  setDate() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    const date = (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + year;
    // console.log(date);
    return date;
  }

  render() {
    const {className, user, modify, match, posts, fetchPublishedPosts} = this.props;
    const {title, text, photo, price, phone, location } = this.state;

    fetchPublishedPosts();

    console.log(posts);
    const thisPost = posts.find(post => post._id === match.params.id);
    console.log(thisPost);

    return (
      <div className={clsx(className, styles.root)}>
        {user === 'logged author' || user === 'admin' ?
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
                      defaultValue= {''}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => this.handleChange('title', e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={ title ?
                        () => modify({
                          ...thisPost,
                          update: new Date(),
                          title,
                        }) : ''
                      }
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                  </TableCell>
                  <TableCell>
                    <TextareaAutosize aria-label="minimum height" rowsmin={3} placeholder="New content"  onChange={(e) => this.handleChange('text', e.target.value)} />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={ text ?
                        () => modify({
                          ...posts.find(post => post._id === (match.params.id)),
                          update: new Date(),
                          text,
                        }) : ''
                      }
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                  </TableCell>
                  <TableCell>
                    <input
                      type="file"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={ photo ?
                        () => modify({
                          ...posts.find(post => post._id === (match.params.id)),
                          update: new Date(),
                          photo,
                        }) : ''
                      }
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
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
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={ price ?
                        () => modify({
                          ...posts.find(post => post._id === (match.params.id)),
                          update: new Date(),
                          price,
                        }) : ''
                      }
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
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
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={ phone ?
                        () => modify({
                          ...posts.find(post => post._id === (match.params.id)),
                          update: new Date(),
                          phone,
                        }) : ''
                      }
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
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
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={ location ?
                        () => modify({
                          ...posts.find(post => post._id === (match.params.id)),
                          update: new Date(),
                          location,
                        }) : ''
                      }
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
  modify: obj => dispatch(modifyPost(obj)),
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
