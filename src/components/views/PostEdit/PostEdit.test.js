import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

const mockProps = {
  user: 'logged',
  match: {
    params: {

    },
  },
  posts: [
    {
      id: 1,
      title: 'title1',
      author: 'author1',
      created: 'date1',
      updated: 'date2',
      status: 'status1',

    },
  ],
  fetchPublishedPosts: () => console.log(''),
};

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostEditComponent {...mockProps}/>);
    expect(component).toBeTruthy();
  });
});
