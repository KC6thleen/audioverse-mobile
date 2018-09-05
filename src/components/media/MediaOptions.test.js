import React from 'react'
import MediaOptions from './MediaOptions'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const tree = renderer.create(<MediaOptions rate={1} onSetRate={jest.fn()} />).toJSON()
  expect(tree).toMatchSnapshot()
})
