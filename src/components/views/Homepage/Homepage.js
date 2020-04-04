import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser, getAll, fetchPublished } from '../../../redux/postsRedux';

import styles from './Homepage.module.scss';

const Component = ({className, user, posts, fetchPublishedPosts}) => {
  fetchPublishedPosts();
  return(
    <div className={clsx(className, styles.root)}>
      {user ==='logged' || user ==='logged author'?
        <Button className={styles.add} variant="outlined" color="primary" href="/post/add">
        + Add bulletin
        </Button>
        :
        ' '
      }
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={styles.w15}>Author</TableCell>
              <TableCell className={styles.w15}>Created</TableCell>
              <TableCell className={styles.w40}>Title</TableCell>
              <TableCell className={styles.w30}>Photo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map(row => (
              <TableRow key={row.id}>
                <TableCell><Link to={`${process.env.PUBLIC_URL}/post/${row._id}`}>{row.author}</Link></TableCell>
                <TableCell><Link to={`${process.env.PUBLIC_URL}/post/${row._id}`}>{row.created}</Link></TableCell>
                <TableCell><Link to={`${process.env.PUBLIC_URL}/post/${row._id}`}>{row.title}</Link></TableCell>
                <TableCell><Link to={`${process.env.PUBLIC_URL}/post/${row._id}`}>{row.photo}</Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );

};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.string,
  posts: PropTypes.array,
  fetchPublishedPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  user: getUser(state),
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
