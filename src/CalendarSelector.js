import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import Weather from "./weather";

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDays: []
    };
  }

  handleDayClick(day, { disabled, selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else if (!disabled) {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
    this.ParentAddDate();
  }

  removeItem(index) {
    const list = this.state.selectedDays;
    list.splice(index, 1);
    this.setState({ list });
  }

  ParentAddDate() {
    this.props.data.dateChange(this.state.selectedDays);
  }

  render() {
    const disabledDays = {
      before: new Date()
    };
    return (
      <div>
        <DayPicker
          disabledDays={disabledDays}
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
        />
        <div>
          {this.state.selectedDays.map((i, index) => (
            <div>
              {i.toLocaleDateString()}
              <button onClick={() => this.removeItem(index)}>Delete</button>
              <Weather date={i} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
