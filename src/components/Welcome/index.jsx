import React from 'react';

import Articles from './Articles/index';

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: {},
    };
  }

  componentWillMount = async () => {
    const articles = await this.props.getArticles();
    this.setState({ articles });
    this.props.setArticles(articles.data);
  }

  handlePagination = async (url) => {
    const articles = await this.props.getArticles(url);
    this.setState({ articles });
    this.props.setArticles(articles.data);
  }


  render() {
    return (
      <Articles
        articles={this.state.articles.data}
        handlePagination={this.handlePagination}
        nextUrl={this.state.articles.next_page_url}
        prevUrl={this.state.articles.prev_page_url}
      />
    );
  }
}

export default Welcome;
