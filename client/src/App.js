// Import Libraries
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from 'jwt-decode';

// Import Component js files
import NavBar from './components/NavBar';
import AuthRoute from './components/AuthRoute';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import SignInPage from './components/SignInPage';
import AuctionIndexPage from './components/AuctionIndexPage';
import AuctionShowPage from './components/AuctionShowPage';
import AuctionCreatePage from './components/AuctionCreatePage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }

    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signOut = this.signOut.bind(this);


  }

  componentDidMount() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      const payload = jwtDecode(jwt);
      this.setState({
        user: payload
      });
    }
  }

  signIn() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      const payload = jwtDecode(jwt);
      this.setState({
        user: payload
      });
    }
  }

  signUp() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      const payload = jwtDecode(jwt);
      this.setState({
        user: payload
      });
    }
  }

  isSignedIn() {
    return !!this.state.user;
  }

  signOut() {
    localStorage.removeItem('jwt');
    this.setState({user: null});
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar
            user={this.state.user}
            onSignOut={this.signOut}
          />
          <Switch>
            <Route exact path="/" component={ HomePage } />
            <AuthRoute isAuthenticated={this.isSignedIn()} exact path="/auctions" component={ AuctionIndexPage }/>
            <AuthRoute isAuthenticated={this.isSignedIn()} path="/auctions/new" component={ AuctionCreatePage }/>
            <AuthRoute isAuthenticated={this.isSignedIn()} path="/auctions/:id" component={ AuctionShowPage }/>
            <Route path="/sign_in" render={ props => (
                <SignInPage {...props} onSignIn={this.signIn} />
              )}
            />
            <Route component={ NotFoundPage } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
