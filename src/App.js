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

  omit = (obj, keyToOmit) => {
    return Object.entries(obj).reduce(
      (newObj, [key, value]) =>
          key === keyToOmit ? newObj : {...newObj, [key]: value},
      {}
    );
  }

  newRandomCard = () => {
    const id = Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }
  }

  handleRandom = (listId) => {
    const newCard = this.newRandomCard();
    const newAllCardsObject = this.state.store.allCards;
    newAllCardsObject[newCard.id] = newCard;

    const newLists = this.state.store.lists.map(list => {
      if (list.id === listId){
        list.cardIds.push(newCard.id);
      }
      return list});
    
    const newStore = {
      allCards: newAllCardsObject,
      lists: newLists
    }
    this.setState({
      store: newStore,
    })
  }

  handleDeleteClick = (id) => {
    const newAllCardsObject = this.omit(this.state.store.allCards, id)
    const newLists = this.state.store.lists.map(list => {
      let newCardIds = list.cardIds.filter(cardIds => cardIds !== id)
      list.cardIds = newCardIds
      return list})
    const newStore = {
      lists: newLists,
      allCards: newAllCardsObject,
    }
    this.setState({
      store: newStore
    })
  }

  render() {
    let store = this.state.store
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => {
            return <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              delete={this.handleDeleteClick}
              random={this.handleRandom}
            />
          })}
        </div>
      </main>
    );
  }
}

export default App;
