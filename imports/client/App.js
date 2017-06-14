import React, {Component} from 'react';
import Items from '../api/Items'
import {createContainer} from 'meteor/react-meteor-data'
import Item from './Item'

 class App extends Component {
  render() {
    return (

      <div>
        <header>
          <h1>Level Up Voting</h1>
        </header>
        <main>
          <form>
            <input type ='text' />
            <input type ='text' />
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
