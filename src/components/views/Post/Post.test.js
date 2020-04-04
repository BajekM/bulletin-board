import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';


describe('Component Post', () => {
  const mockProps = {
    user: 'logged author',
    posts: [
      {
        _id: 'abcde123',
        title: 'title1',
        date: 'date1',
        author: 'author1',
        content: 'content1',
        created: 'date1',
        updated: 'date2',
        status: 'status1',
      },
    ],
    match: {
      params: {
      },
    },
  };

  mockProps.match.params.id = 'abcde123';

  console.log(mockProps.match.params.id);

  it('should render without crashing', () => {
    const component =  shallow(<PostComponent  {...mockProps}/>);
    expect(component).toBeTruthy();
  });
});
