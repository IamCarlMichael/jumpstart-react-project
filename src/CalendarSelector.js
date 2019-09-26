import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import Weather from "./weather";
import "./App.css";

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
            <div className="event-form-options">
              <div>
                <button
                  className={"delete-button"}
                  onClick={() => this.removeItem(index)}
                >
                  Delete
                </button>
              </div>
              <label>
                <date className={"date"}>{i.toLocaleDateString()}</date>
                <Weather date={i} />
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
