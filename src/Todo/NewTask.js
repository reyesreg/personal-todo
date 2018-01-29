import React, { Component } from "react";
import axios from 'axios';

class NewTask extends Component {
  state = {
    value: ''
  };

  _handleNewTask = () => {
    const task = {
      taskName: this.state.value,
      done: false
    }
    axios.post(this.props.url, task)
      .then(res => {
        this.setState({value: ''});
        this.props.addToList(task);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="new-todo-wrapper">
        <input
          type="text"
          placeholder="Give me something to do..."
          value={this.state.value}
          onChange={e => this.setState({ value: e.target.value })}
        />
        <button className="btn-add" onClick={this._handleNewTask}>+</button>
      </div>
    );
  }
}

export default NewTask;
