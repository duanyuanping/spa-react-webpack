import React, { Component } from 'react';

export default class Con extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1
    }
  }

  handleClick() {
    this.setState({num: this.state.num + 1})
  }

  render() {
    return (
      <div>
        <input value={this.state.num}></input>
        <button onClick={() => this.handleClick()}>+</button>
      </div>
    )
  }
}