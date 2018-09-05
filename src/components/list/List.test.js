import React from 'react'
import List from './List'
import ListItem from './ListItem'

import renderer from 'react-test-renderer'

describe('List component', () => {
  it('renders activity indicator when no items', () => {
    const tree = renderer.create(<List renderItem={jest.fn()} items={[]} isFetching={false} onRefresh={jest.fn()}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders items correctly', () => {
  const tree = renderer.create(<List renderItem={jest.fn(() => <ListItem />)} items={[{id: '1'}]} isFetching={false} onRefresh={jest.fn()}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
