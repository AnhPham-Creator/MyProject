import React from "react";
import createReactClass from 'create-react-class';
import { FormGroup, Form } from 'react-bootstrap'
const DatePicker = require("react-bootstrap-date-picker");
var DateTimePicker = createReactClass({
  getInitialState: function(){
    var value = new Date().toISOString();
    return {
      value: value
    }
  },
  handleChange: function(value:any, formattedValue: any) {
    this.setState({
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
    });
  },
  componentDidUpdate: function(){
    // Access ISO String and formatted values from the DOM.
    var hiddenInputElement  = document.getElementById("example-datepicker") as HTMLInputElement;
    console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
    console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
  },
  render: function(){
    return <FormGroup>
      <Form.Label>Label</Form.Label>
      <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} />
    </FormGroup>;
  }
});

export default DateTimePicker;