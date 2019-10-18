import React from "react";
// import Weather from "./weather";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// class VoteEntry extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       namelist: []
//     };
//   }

//   addVote(item) {
//     if (this.props.data !== "" && !this.state.namelist.includes(item)) {
//       this.setState({
//         namelist: [...this.state.namelist, item]
//       });
//     }
//   }

//   render() {
//     return (
//       <div>
//         <div className={"date"}>{this.props.date}</div>
//         <button
//           className={"vote"}
//           onClick={() => this.addVote(this.props.data)}
//         >
//           Vote!
//         </button>
//         <div className={"vote-counter"}>{this.state.namelist.length}</div>
//         <div>
//           {this.state.namelist.map(i => (
//             <div key={i} className={"vote-namelist"}>
//               {i}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

export default class GenerateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://localhost:3000/votepage/" + props.id,
      event: props.value,
      date: props.dates,
      name: "",
      namelist: []
    };
  }

  handleNameChange = text => {
    this.setState({
      name: text.target.value
    });
  };

  render() {
    return (
      <div className={"voter-Form"}>
        <h1>{this.state.event}</h1>
        <label>Your Voting Link can be found here</label>
        <p>
          <a href={this.state.url}>{this.state.url}</a>
        </p>
      </div>
    );
  }
}
