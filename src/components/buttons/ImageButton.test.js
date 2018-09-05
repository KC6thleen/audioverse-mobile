import React from 'react'
import ImageButton from './ImageButton'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
  const tree = renderer.create(<ImageButton />).toJSON()
  expect(tree).toMatchSnapshot()
})
