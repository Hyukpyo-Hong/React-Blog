import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Navbar from '../Navbar';
import Welcome from '../Welcome';
import Footer from '../Footer';
import CreateArticle from '../CreateArticle';
import Login from '../Login';
import SingleArticle from '../SingleArticle';
import SignUp from '../Signup';
import Auth from '../Auth/index';
import RedirectIfAuth from '../RedirectIfAuth';
import UserArticles from '../UserArticles/index';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authUser: null,
      articles: [],
    };
  }

  componentWillMount() {
    const user = localStorage.getItem('user');
    if (user) {
      this.setState({
        authUser: JSON.parse(user),
      });
    }
  }

  setArticles=(articles) => {
    this.setState({
      articles,
    });
  }

  setAuthUser = (authUser) => {
    this.setState({
      authUser,
    }, () => {
      localStorage.setItem('user', JSON.stringify(authUser));
      this.props.notyService.success('Successfuly Log In');
      this.props.history.push('/');
    });
  };

  removeAuthUser=() => {
    localStorage.removeItem('user');
    this.props.notyService.success('Successfuly Log Out!');
    this.setState({ authUser: null });
  }

  render() {
    const { location } = this.props;
    return (
      <div>
        {location.pathname !== '/login' && location.pathname !== '/signup' && (
          <Navbar authUser={this.state.authUser} removeAuthUser={this.removeAuthUser} />
        )}
        <Route
          exact
          path="/"
          render={
          props => (
            <Welcome
              {...props}
              getArticles={this.props.articlesService.getArticles}
              setArticles={this.setArticles}
            />
          )
        }
        />
        <RedirectIfAuth
          path="/login"
          component={Login}
          props={{
            setAuthUser: this.setAuthUser,
            loginUser: this.props.authService.loginUser,
          }}
          isAuthenticated={this.state.authUser !== null}
        />
        <RedirectIfAuth
          path="/signup"
          component={SignUp}
          props={{
            setAuthUser: this.setAuthUser,
            registerUser: this.props.authService.registerUser,
          }}
          isAuthenticated={this.state.authUser !== null}
        />

        <Auth
          path="/articles/create"
          component={CreateArticle}
          props={{
            getArticleCategories: this.props.articlesService.getArticleCategories,
            createArticle: this.props.articlesService.createArticle,
            token: this.state.authUser ? this.state.authUser.token : null,
            notyService: this.props.notyService,

          }}
          isAuthenticated={this.state.authUser !== null}
        />

        <Auth
          path="/user/articles"
          component={UserArticles}
          props={{
            getUserArticles: this.props.articlesService.getUserArticles,
            setArticles: this.setArticles,
            deleteArticle: this.props.articlesService.deleteArticle,
            token: this.state.authUser ? this.state.authUser.token : null,

          }}
          isAuthenticated={this.state.authUser !== null}
        />

        <Auth
          path="/article/edit/:slug"
          component={CreateArticle}
          props={{
            getArticleCategories: this.props.articlesService.getArticleCategories,
            createArticle: this.props.articlesService.createArticle,
            token: this.state.authUser ? this.state.authUser.token : null,
            articles: this.state.articles,
            updateArticle: this.props.articlesService.updateArticle,
          }}
          isAuthenticated={this.state.authUser !== null}
        />

        <Route
          path="/article/:slug"
          exact
          render={
          props => (
            <SingleArticle
              {...props}
              getArticle={this.props.articlesService.getArticle}
              articles={this.state.articles}
            />
          )
        }
        />
        {location.pathname !== '/login' && location.pathname !== '/signup' && (
          <Footer />
        )}
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  authService: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default App;
