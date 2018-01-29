import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import NewTask from './NewTask';
import TaskItem from './TaskItem/';

class Todo extends Component {
  state = {
    allTasks: []
  };

  _renderTodo() {
    const allTasks = this.state.allTasks.map((task, index) => {
      return <TaskItem task={task} key={index} />
    });

    return allTasks;
  }

  _getTodo() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({allTasks: res.data});
      })
  }

  _addToList = (newTask) => {
    let newTasks = this.state.allTasks.concat([newTask]);
    this.setState({
      allTasks: newTasks
    })
  }

  componentDidMount() {
    this._getTodo();
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <NewTask url={this.props.url} addToList={this._addToList}/>
        {this._renderTodo()}
      </div>
    );
  }
}

export default Todo;