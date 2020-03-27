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
import { getUser, getAll, addPost } from '../../../redux/postsRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostAdd.module.scss';

class Component extends React.Component {

  state = {
    title: '',
    content: '',
  }

  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.string,
    posts: PropTypes.object,
    addBulletin: PropTypes.func,
  }

  handleChange(prop, newValue) {
    if (prop === 'title') {
      this.setState(state => (
        {
          title: newValue,
        }
      ));
    } else if (prop === 'content') {
      this.setState(state => (
        {
          content: newValue,
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
    const {className, user, posts, addBulletin} = this.props;
    const {title, content} = this.state;
    return (
      <div className={clsx(className, styles.root)}>
        {user === 'logged' || user === 'admin' ?
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={styles.w40}>Title</TableCell>
                  <TableCell>Contents</TableCell>
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
                  </TableCell>
                  <TableCell>
                    <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Content" onChange={(e) => this.handleChange('content', e.target.value)} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button className={styles.add} variant="outlined" color="primary" href='/' onClick={
              () => addBulletin({
                id: posts.length + 1,
                title,
                author: 'Me',
                date: this.setDate(),
                content,
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
  addBulletin: obj => dispatch(addPost(obj)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
