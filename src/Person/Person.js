import React from 'react';
import './Person.css';

const Person = props => {
  const { click, change } = props;
  return (
    <div className="Person">
      <p onClick={click}>
        I'm a {props.name} and I am {props.age}!
      </p>
      <p>{props.children}</p>
      <input type="text" onChange={change} value={props.name} />
    </div>
  );
};

export default Person;
