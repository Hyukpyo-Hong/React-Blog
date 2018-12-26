import React from 'react';
import Article from './Article';

class SingleArticleContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      article: null,
      loading: true,
    };
  }

  componentWillMount = async () => {
    let article = this.props.articles.find(article => article.slug === this.props.match.params.slug);

    if (article) {
      this.setState({
        article,
        loading: false,
      });
    } else {
      article = await this.props.getArticle(this.props.match.params.slug);
      this.setState({
        article,
        loading: false,
      });
    }
  }


  render() {
    console.log(this.state.article);
    return (
      <div>
        {
          !this.state.loading
          && (
          <Article
            article={this.state.article}
          />
          )
        }
        {this.state.loading
        && <p className="text-center">Loading...</p>
        }
      </div>

    );
  }
}


export default SingleArticleContainer;
