import React from 'react'
import IconButton from './IconButton'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const tree = renderer.create(<IconButton />).toJSON()
  expect(tree).toMatchSnapshot()
})
