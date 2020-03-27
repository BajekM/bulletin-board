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
import { getUser, changeTitle, changeContent } from '../../../redux/postsRedux';

import styles from './PostEdit.module.scss';

class Component extends React.Component {

  state = {
    title: '',
    content: '',
  }

  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.string,
    modifyContent: PropTypes.func,
    modifyTitle: PropTypes.func,
    match: PropTypes.object,
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
    const {className, user, modifyTitle, modifyContent, match} = this.props;
    const {title, content} = this.state;
    return (
      <div className={clsx(className, styles.root)}>
        {user === 'logged author' || user === 'admin' ?
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
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={
                        () => modifyTitle({
                          id: parseInt(match.params.id),
                          title,
                          content,
                          update: this.setDate(),
                        })
                      }
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                  </TableCell>
                  <TableCell>
                    <TextareaAutosize aria-label="minimum height" rowsmin={3} placeholder="New content"  onChange={(e) => this.handleChange('content', e.target.value)} />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={
                        () => modifyContent({
                          id: parseInt(match.params.id),
                          title,
                          content,
                          update: this.setDate(),
                        })
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
});

const mapDispatchToProps = dispatch => ({
  modifyTitle: obj => dispatch(changeTitle(obj)),
  modifyContent: obj => dispatch(changeContent(obj)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
