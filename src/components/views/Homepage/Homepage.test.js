import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

const mockProps = {
  user: 'logged',
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

describe('Component Homepage',  () => {
  it('should render without crashing',  () => {
    const component = shallow(<HomepageComponent {...mockProps}/>);
    expect(component).toBeTruthy();
  });
});
