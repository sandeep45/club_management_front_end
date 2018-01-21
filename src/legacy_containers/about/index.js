import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    goToHomePage: () => push("/")
  }, dispatch);
};

class About extends Component {
  constructor(props) {
    super(props)
  };

  render() {
    const {goToHomePage} = this.props;

    return (
      <div>
        <h1>About Us</h1>
        <button onClick={goToHomePage}>Go Home!</button>
      </div>
    );
  };
}



About = connect(mapStateToProps, mapDispatchToProps)(About);

export default About;