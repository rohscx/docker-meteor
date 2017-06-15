import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data'
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import Item from './Item'

import Items from '../api/Items'

 class App extends Component {
   addItems(event) {
     event.preventDefault();
     const itemOne = this.refs.itemOne.value.trim();
     const itemTwo = this.refs.itemTwo.value.trim()
     if (itemOne != '' && itemTwo != '') {
         Meteor.call('insertNewItem', itemOne, itemTwo);
         this.refs.itemOne.value = '';
         this.refs.itemTwo.value = '';
     }
     }

  render() {
    return (

      <div>
        <header>
          <h1>Level Up Voting</h1>
          <LoginButtons />
        </header>
        <main>
          <form className='new-items' onSubmit={this.addItems.bind(this)}>
            <input type ='text' ref='itemOne' />
            <input type ='text' ref='itemTwo'/>
            <button type='submit'>Add Items</button>
          </form>
          {this.props.items.map((item) => {
            return <Item item={item} key={item._id}/>
          })}
        </main>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    items: Items.find({}).fetch()
  }
}, App);
