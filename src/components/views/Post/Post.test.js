import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';


describe('Component Post', () => {
  const mockProps = {
    user: 'logged author',
    match: {
      params: {
      },
    },
    posts: [
      {
        id: 1,
        title: 'title1',
        date: 'date1',
        author: 'author1',
        content: 'content1',
      },

      {
        id: 2,
        title: 'title2',
        date: 'date2',
        author: 'author2',
        content: 'content2',
      },
    ],

  };

  mockProps.match.params.id = 1;
  
  it('should render without crashing', () => {
    const component =  shallow(<PostComponent  {...mockProps}/>);
    expect(component).toBeTruthy();
  });
});
