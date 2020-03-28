import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

const mockProps = {
  user: 'logged',
  posts: [
    {
      id: 1,
      title: 'title1',
    },

    {
      id: 2,
      title: 'title2',
    },
  ],
};

describe('Component Homepage',  () => {
  it('should render without crashing',  () => {
    const component = shallow(<HomepageComponent {...mockProps}/>);
    expect(component).toBeTruthy();
  });
});
