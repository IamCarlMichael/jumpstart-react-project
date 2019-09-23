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
