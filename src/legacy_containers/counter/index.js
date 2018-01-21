import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import {decrementAsync, incrementAsync} from "../../legacy_modules/counter";

const mapStateToProps = (state, ownProps) => {
  return {
    isIncrementing: state.counter.isIncrementing,
    isDecrementing: state.counter.isDecrementing,
    count: state.counter.count,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    decrementAsync,
    incrementAsync
  }, dispatch);
};

class Counter extends Component {
  constructor(props) {
    super(props)
  };

  render() {
    const {incrementAsync, decrementAsync} = this.props;
    const {count,isIncrementing,isDecrementing} = this.props;

    return (
      <div>
        <h1>Counter Us</h1>
        <h2>Count: {count}</h2>
        <h4>
        {isIncrementing ? 'Count value increase in progress' : ''}
        {isDecrementing ? 'Count value decrease in progress' : ''}
        </h4>
        <button onClick={incrementAsync}>Increment</button>
        <button onClick={decrementAsync}>Decrement</button>
      </div>
    );
  };
}



Counter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default Counter;