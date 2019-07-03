import React, { Component } from 'react';
import Person from './Person/Person';
import Validation from './ValidationComponent/Validation';
import Char from './Char/Char';
import './App.css';

class App extends Component {
  state = {
    persons: [
      { id: '1', name: 'Dan', age: 32 },
      { id: '2', name: 'Charlotte', age: 31 },
      { id: '3', name: 'Nate', age: 37 }
    ],
    showPersons: false,
    userInput: ''
  };

  inputChangeHandler = e => {
    this.setState({ userInput: e.target.value });
  };

  deleteCharHandler = index => {
    const text = this.state.userInput.split('');
    text.splice(index, 1);
    const updatedText = text.join('');
    this.setState({ userInput: updatedText });
  };

  nameChangedHandler = (event, id) => {
    //This will take in an event and an ID
    const personIndex = this.state.persons.findIndex(p => {
      //findIndex takes a function as an arg, and executes it on every element in the array
      return p.id === id; //Need to return true or false, this returns true if p.id(p being the arg(person) passed in) matches the id arg received by the function
    }); // sets res to personIndex

    const person = {
      ...this.state.persons[personIndex] //then get the person from personIndex and set it to person.
    }; //uses the spread operator to distribute all the properties from persons on state to the person var. So we dont try and mutate whats on state.

    person.name = event.target.value; // now update the person name, which we will the value in the input field.

    const persons = [...this.state.persons]; // this gets the array persons from state, this works like slice().
    persons[personIndex] = person; // sets updated person from directly above into the personIndex on persons.

    this.setState({
      persons: persons // now set state to a updated copy of our persons array from above.
    });
  };

  deletePersonHandler = personIndex => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            // person here will have the props of persons on state (id, name, age,)
            return (
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                change={event => this.nameChangedHandler(event, person.id)} //event gets passed in here from (onChange event in Person) and we get ID here from the person arg being passed into the map function
              />
            );
          })}
        </div>
      );
    }

    const charList = this.state.userInput.split('').map((char, index) => {
      return (
        <Char
          key={index}
          character={char}
          clicked={() => this.deleteCharHandler(index)}
        />
      );
    });

    return (
      <div className="App">
        <h1>Hi, I'm a react app</h1>
        <p>This is really working</p>
        <button onClick={this.togglePersonHandler}>Toggle Person</button>
        {persons}
        <hr />
        <input
          type="text"
          onChange={this.inputChangeHandler}
          value={this.state.userInput}
        />
        <p>{this.state.userInput}</p>
        <Validation inputLength={this.state.userInput.length} />
        {charList}
      </div>
    );
  }
}

export default App;
