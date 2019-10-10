import React, { Component } from 'react';
import List from './List'
import './App.css';

class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };

  state = {
    store: this.props.store
  }

omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

  handleDeleteClick(id) {
    const newAllCardsArray = this.omit(this.state.store.allCards, id)
    const newLists = this.state.store.lists.map(list => {
      return list.cardIds.filter(cardIds => cardIds !== id)})
    const newStore = {
      lists: newLists,
      allCards: newAllCardsArray,
    }
    this.setState({
      store: newStore
    })
  }



  render() {
    const store = this.state.store
    console.log(store.lists);
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
