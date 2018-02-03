import React, { Component } from "react";
import TaskInput from "./TaskInput";

class TaskItem extends Component {
  state = {
    class: "task-item-wrapper"
  };

  componentDidMount() {
    const task = this.props.task;
    if (task.done) {
      this.setState({
        class: "task-item-wrapper done"
      });
    }
  }

  _handleRenderTask() {
    if (this.state.class === "task-item-wrapper edit") {
      return <TaskInput initialValue={this.props.task.taskName}/>;
    }

    return (
      <div onClick={this._handleFinishTask}>{this.props.task.taskName}</div>
    );
  }

  _handleEditTask = () => {
    if (this.state.class === "task-item-wrapper") {
      this.setState({
        class: "task-item-wrapper edit"
      });
      return null;
    }

    this.setState({
      class: "task-item-wrapper"
    });
  };

  _handleFinishTask = () => {
    if (this.state.class === "task-item-wrapper") {
      this.setState({
        class: "task-item-wrapper done"
      });
      return null;
    }

    this.setState({
      class: "task-item-wrapper"
    });
  };

  render() {
    return (
      <div className={this.state.class}>
        {this._handleRenderTask()}
        <div className="action-wrapper">
          <span onClick={this._handleEditTask}><i className="far fa-edit"/></span>
          <i className="far fa-trash-alt" />
        </div>
      </div>
    );
  }
}

export default TaskItem;
