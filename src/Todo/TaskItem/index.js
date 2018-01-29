import React, { Component } from 'react';

class TaskItem extends Component {
  state = {
    class: 'task-item-wrapper'
  };

  componentDidMount() {
    const task = this.props.task;
    if(task.done) {
      this.setState({
        class: 'task-item-wrapper done'
      })
    }
  }

  render() {
    

    return (
      <div className={this.state.class}>
        {this.props.task.taskName}
      </div>
    );
  }
}

export default TaskItem;