import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter';

import RaisedButton from 'material-ui/RaisedButton';

const Home = props => (

  <div class="container">
    <div class="col-md-6 col-sm-12">
      <h1>Home</h1>
      <p>Count: {props.count}</p>

      <p>
        <RaisedButton label="increment" onClick={props.increment} disabled={props.isIncrementing} />
        <button onClick={props.incrementAsync} disabled={props.isIncrementing}>Increment Async</button>
      </p>

      <p>
        <RaisedButton label="hello" primary={true} />
      </p>

      <p>
        <button onClick={props.decrement} disabled={props.isDecrementing}>Decrementing</button>
        <button onClick={props.decrementAsync} disabled={props.isDecrementing}>Decrement Async</button>
      </p>
    </div>
  </div>

)

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)