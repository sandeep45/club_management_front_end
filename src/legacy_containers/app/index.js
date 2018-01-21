import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Counter from '../counter'

const App = () => (
  <div>
    <h1>Header Component</h1>
    <header>
      <Link to="/">Home</Link> <Link to="/about-us">About</Link>
    </header>

    <h1>Main Body Component(s)</h1>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/counter" component={Counter} />
    </main>
  </div>
);

export default App;