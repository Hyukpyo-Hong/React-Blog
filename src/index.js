import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CreateArticle from "./components/CreateArticle";
import Login from "./components/Login";
import SingleArticle from "./components/SingleArticle";

const Home = () => {
  return <h1>This is the Home Page</h1>;
};
const About = () => {
  return <h1>This is the About Page</h1>;
};

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Navbar />
      <Route exact path="/" component={Welcome} />
      <Route path="/about" component={About} />
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/articles/create" component={CreateArticle} />
      <Route path="/article/:slug" component={SingleArticle} />

      <Footer />
    </div>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
