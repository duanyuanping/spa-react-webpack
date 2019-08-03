import React, { Component } from 'react';

class Test extends Component {
  static renderPage() {
    return (
      <div>
        <input value={1}></input>
        <button onClick={() => this.handleClick()}>+</button>
      </div>
    );
  }
}



class Con extends Test {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
    }
  }

  handleClick() {
    this.setState({num: this.state.num + 1})
  }

  render() {
    return Con.renderPage.call(this)
  }
}

// export default class extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       num: 1,
//     }
//   }

//   handleClick() {
//     this.setState({num: this.state.num + 1})
//   }

//   render() {
//     new Promise((res, rej) => {})
//     new Set([[1, 4]])
//     const a = [1, 5, 6];
//     console.log(a.includes(4))
//     for (let i of a) {
//       console.log(i)
//     }
//     return (
//       <div>
//         <input value={this.state.num}></input>
//         <button onClick={() => this.handleClick()}>+</button>
//       </div>
//     )
//   }
// }

export default class extends Component {
  render() {
    return Con.renderPage()
  }
}