import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import TestBlog from './testBlog'


afterEach(cleanup)
describe.only('<Blog />', () => {
  let component
  let handler

  beforeEach(() => {
    const blog = {
      title: 'This is a frontend blog test',
      author: 'Test',
      url: 'Test',
      user: '49djghfgkh48943485',
      likes: 123
    }
    handler = jest.fn()
    component = render(<TestBlog blog={blog} onClick={handler} />)
  })

  it('Is there a title', () => {
    const div = component.container.querySelector('.titleauthor')
    expect(div).toHaveTextContent('This is a frontend blog test')
  })

  it('Is there an author', () => {
    const div = component.container.querySelector('.titleauthor')
    expect(div).toHaveTextContent('Test')
  })

  it('Is there likes)', () => {
    const div = component.container.querySelector('.likes')
    expect(div).toHaveTextContent(123)
  })

  it('Can the like button be pressed 2 times ', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(handler.mock.calls.length).toBe(2)
  })
})