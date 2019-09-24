import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      selectedDay: undefined,
      list: []
    };
  }

  handleDayChange(day) {
    this.setState({
      selectedDay: day,
      list: [...this.state.list, day]
    });
  }

  render() {
    const { selectedDay } = this.state;
    return (
      <div>
        {selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
        {!selectedDay && <p>Choose a day</p>}
        <DayPickerInput onDayChange={this.handleDayChange} />
        <div>
          {this.state.list.map(i => (
            <div>{i}</div>
          ))}
        </div>
      </div>
    );
  }
}

// class GenerateForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       event: props.value,
//       date: props.dates
//     };
//   }

//   render() {
//     console.log(this.state.date);
//     return (
//       <div>
//         <h1>{this.state.event}</h1>
//         <div>
//           {this.state.date.map(i => (
//             <div>{i.toLocaleDateString()}</div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// class EventName extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: ""
//     };
//   }

//   render() {
//     return (
//       <div className="{event-input}">
//         <h1>Event Form</h1>
//         <input type={"Text"} aria-label="event-input-1"></input>
//       </div>
//     );
//   }
// }

// class SubmitButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: "",
//       displayQuestions: false
//     };
//   }

//   displayValue = () => {
//     this.setState({
//       displayQuestions: !this.state.displayQuestions
//     });
//   };

//   render() {
//     return (
//       <div className="{submit-button}">
//         <button onClick={this.displayValue}>Submit</button>
//         {this.state.displayQuestions ? <EventVotePage /> : null}
//       </div>
//     );
//   }
// }

// class EventVotePage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: ""
//     };
//   }

//   render() {
//     return (
//       <div>
//         <h1>Hello</h1>
//       </div>
//     );
//   }
// }
