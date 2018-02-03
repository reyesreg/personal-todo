import React, { Component } from 'react';

class TaskInput extends Component {
  state = {
    value: ''
  }

  componentDidMount() {
    this.setState({
      value: this.props.initialValue
    })
  }

  _handleOnChange = (e) => {
    this.setState({
      value: e.target.value
    });
    return e.target.value;
  }

  render() {
    return (
      <input
        type="text"
        placeholder="Give me something to do..."
        value={this.state.value}
        onChange={this._handleOnChange}
      />
    );
  }
}

export default TaskInput;