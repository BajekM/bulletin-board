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
import { getUser, getAll, removePost} from '../../../redux/postsRedux';


import styles from './Post.module.scss';


const Component = ({className, user, match, posts, deletePost}) => (
  <div className={clsx(className, styles.root)}>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell >Author</TableCell>
            <TableCell >Created</TableCell>
            <TableCell >Updated</TableCell>
            <TableCell>Text</TableCell>
            <TableCell>Photo</TableCell>
            <TableCell>Data</TableCell>
            {user === 'logged' || user === 'logged author' || user === 'admin' ?
              <TableCell className={styles.w10}>Actions</TableCell>
              :
              ''
            }
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={styles.w10}>{posts.find(post => post._id === (match.params.id)).author}</TableCell>
            <TableCell className={styles.w15}>{posts.find(post => post._id === (match.params.id)).created}</TableCell>
            <TableCell className={styles.w15}>{posts.find(post => post._id === (match.params.id)).updated}</TableCell>
            <TableCell className={styles.w35}>{posts.find(post => post._id === (match.params.id)).text}</TableCell>
            <TableCell className={styles.w15}>{posts.find(post => post._id === (match.params.id)).photo}</TableCell>
            <TableCell>
              <div>Price: {posts.find(post => post._id === (match.params.id)).price}</div>
              <div>Phone: {posts.find(post => post._id === (match.params.id)).phone}</div>
              <div>Location: {posts.find(post => post._id === (match.params.id)).location}</div>
            </TableCell>
            <TableCell>
              {user === 'logged author' || user === 'admin' ?
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => deletePost(match.params.id)}
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
  deletePost: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: getUser(state),
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  deletePost: (id) => dispatch(removePost(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
