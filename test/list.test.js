import expect from 'expect.js'
import React from 'react'

import {renderShallow} from './test_helper'
import Sort from '../dist/list-sort'
import Filter from '../dist/list-filter'
import Item from '../dist/list-item'
import Content from '../dist/list-item-content'
import List from '../dist/list'
import {projects, project} from './fixtures/list'

describe('component list', () => {

  describe('content', () => {
    let content, contentChildren
      , content2, content2Children

    before( () => {
      content = renderShallow(<Content item={project.item[project.formItem[0].label]} type={project.item[project.formItem[0].type]} />)
      contentChildren = content.props.children
      content2 = renderShallow(<Content item={project.item[project.formItem[1].label]} type={project.item[project.formItem[1].type]} />)
      content2Children = content2.props.children
    });

    it('should be span', () => {
      expect(content.type).to.equal('span')
      expect(content2.type).to.equal('span')
    });

    it('should have first children to equal to td', () => {
      expect(contentChildren).to.equal(1)
      expect(content2Children).to.equal('post 1')
    });

    it('should return a span with content', () => {
      expect(content).to.eql(<span>{"1"}</span>);
      expect(content2).to.eql(<span>{"post 1"}</span>);
    })

  });

  describe('item', () => {
    let item, itemChildren

    before( () => {
      item = renderShallow(<Item item={project.item} fItem={project.formItem} urlParams={{identity:project.identity, id: project.item.id}} />)
      itemChildren = item.props.children
    });

    it('should be tr', () => {
      expect(item.type).to.equal('tr')
    });

    it('should have first children to equal to td', () => {
      expect(itemChildren[0].type).to.equal('td')
    });

    it('should have second children with 3 td tag', () => {
      expect(itemChildren[1].map( child => { if (child.type === 'td') return child }).length).to.equal(3)
    });

  });

  describe('sort', () => {
    let sort, sortChildren

    before( () => {
      sort = renderShallow(<Sort item={projects.formItem} sortBy={function(){}} />)
      sortChildren = sort.props.children
    });

    it('should have first children to equal to th', () => {
      expect(sortChildren[0].type).to.equal('th')
    });

    it('should have second children with 3 th tag', () => {
      expect(sortChildren[1].map( child => { if (child.type === 'th') return child }).length).to.equal(3)
    });
  });

  describe('filter', () => {
    let filter, filterChildren

    before( () => {
      filter = renderShallow(<Filter item={projects.formItem} filterBy={function(){}} />)
      filterChildren = filter.props.children
    });

    it('should have first children to equal to th', () => {
      expect(filterChildren[0].type).to.equal('th')
    });

    it('should have second children with 3 th tag', () => {
      expect(filterChildren[1].map( child => { if (child.type === 'th') return child }).length).to.equal(3)
    });
  });

  describe('item', () => {
    let item, itemChildren

    before( () => {
      let urlParams = {identity:project.identity, id: project.item.id};
      item = renderShallow(<Item key={project.item.id}
                            item={project.item}
                            fItem={project.formItem}
                            urlParams={urlParams} />)
      itemChildren = item.props.children
    });

    it('should have first children to equal to td', () => {
      expect(itemChildren[0].type).to.equal('td')
    });

    it('should have first children to equal to "Edit"', () => {
      expect(itemChildren[0].props.children.props.children).to.equal('Edit')
    });

    it('should have second children with 3 td tag', () => {
      expect(itemChildren[1].map( child => { if (child.type === 'td') return child }).length).to.equal(3)
    });

  });

  describe('list', () => {
    let list, listChildren;

    before(function(){
      list = renderShallow(<List {...projects} skip={0} limit={10} total={5} />)
      listChildren = list.props.children;
    })

    it('should be a div', () => {
      expect(list.type).to.equal('div');
    });


    it.skip('should', () => {
      expect(listChildren[1]).to.eql(
        <table className="table">
          <thead>
            <Sort item={projects.formItem} sortBy={function(){}} />
            <Filter item={projects.formItem} filterBy={function(){}} />
          </thead>
          <tbody>
            {projects.items.map( item => {
              return <Item key={item.id} item={item} fItem={projects.formItem} urlParams={{identity:projects.identity, id: item.id}} />
            })}
          </tbody>
        </table>
      );
    });  // does not work because sortBy and filterBy fn

    it('should return a list of items', () => {
      expect(listChildren[1].props.children[1]).to.eql(
        <tbody>
          {projects.items.map( item => {
            return <Item key={item.id} item={item} fItem={projects.formItem} urlParams={{identity:projects.identity, id: item.id}} />
          })}
        </tbody>
      );
    })

    it('should H1', () => {
      expect(listChildren[0]).to.eql(<h1>{"project"} List</h1>);
    })

    it('should Pagination', () => {
      expect(listChildren[2].type).to.equal('div');
    })

  });

})
