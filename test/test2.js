import expect from 'expect.js'
import React from 'react'

import {renderShallow} from './test_helper'
import Sort from '../dist/list-sort'
import {projects} from './fixtures/list'

describe('components', () => {
  let sort, children;

  before( () => {
    sort = renderShallow(<Sort item={projects.formItem} sortBy={function(){}} />)
    children = sort.props.children
  });

  it('works', () => {
    expect(children[0].type).to.equal('th')
  });

  it('works', () => {
    const ths = children[1].map(c => c.props.children)
    expect(ths).to.eql([ 'id', 'name', 'website' ])
  });


})
