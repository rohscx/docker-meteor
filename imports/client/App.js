import React, {Component} from 'react';
import Items from '../api/Items'
import {createContainer} from 'meteor/react-meteor-data'

 class App extends Component {
  render() {
    return (

      <div>
        <header>
          <h1>Level Up Voting</h1>
        </header>
        <main>
          {this.props.items.map((item) => {
            return (
              <div>
                {item.itemOne.text}
              </div>
            )
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

}
