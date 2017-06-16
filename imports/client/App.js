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
         Meteor.call('insertNewItem', itemOne, itemTwo, (err, res) => {
           if(!err) {
             this.refs.itemOne.value = '';
             this.refs.itemTwo.value = '';
           }
         });
     }
   }
   showAll() {
     Session.set('showAll', true);
   }

  render() {

    if (!this.props.ready) {
      return <div>Loading...</div>
    }

    return (

      <div>
        <header>
          <h1>Level Up Voting</h1>
          <LoginButtons />
          <button onClick={this.showAll}>Show All</button>
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
  let itemsSub = Meteor.subscribe('allItems');
  let showAll = Session.get('showAll');
  return {
    ready: itemsSub.ready(),
    items: Items.find({}, {
      // ternary operator. a form of IF THEN statement
      limit: showAll ? 50 : 1,
      // value 1 (OLDEST) or -1 (NEWEST) determines directions of lastUpdated
      sort: {lastUpdated: 1}
    }).fetch()
  }
}, App);
