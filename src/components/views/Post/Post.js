import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser, getAll, deletePost} from '../../../redux/postsRedux';


import styles from './Post.module.scss';


const Component = ({className, user, match, posts, removePost}) => (
  <div className={clsx(className, styles.root)}>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={styles.w5}>Nr</TableCell>
            <TableCell className={styles.w10}>Date</TableCell>
            <TableCell className={styles.w10}>Author</TableCell>
            <TableCell className={styles.w10}>Title</TableCell>
            <TableCell>Content</TableCell>
            {user === 'logged' || user === 'logged author' || user === 'admin' ?
              <TableCell className={styles.w10}>Actions</TableCell>
              :
              ''
            }
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{posts.find(post => post.id === parseInt(match.params.id)).id}</TableCell>
            <TableCell>{posts.find(post => post.id === parseInt(match.params.id)).date}</TableCell>
            <TableCell>{posts.find(post => post.id === parseInt(match.params.id)).author}</TableCell>
            <TableCell>{posts.find(post => post.id === parseInt(match.params.id)).title}</TableCell>
            <TableCell>{posts.find(post => post.id === parseInt(match.params.id)).content}</TableCell>
            <TableCell>
              {user === 'logged author' || user === 'admin' ?
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => removePost(posts.find(post => post.id === parseInt(match.params.id)))}
                    href="/"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    href={'/post/' + match.params.id + '/edit'}
                  >
                    Edit
                  </Button>
                </div>
                :
                ''
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.string,
  match: PropTypes.object,
  posts: PropTypes.array,
  removePost: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: getUser(state),
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  removePost: post => dispatch(deletePost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
