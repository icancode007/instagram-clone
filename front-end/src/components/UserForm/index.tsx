import * as React from 'react';

export default class Counter extends React.Component {
  //could be refactored to functional component if hooks will be used
  componentDidMount(){
    fetch('/root')
    .then(res => res.json())
    .then(data => console.log(data));
  }

  render () {
    return (
      <div>
      testing
      </div>
    );
  }
}
