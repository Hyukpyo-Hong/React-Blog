import React from 'react';

import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Banner from '../../Banner';

const CreateArticle = ({
  handleInputChange, categories, handleSubmit, errors, editing, article, title, category, content, updateArticle, handleEditorState,
}) => (
  <div>
    <Banner
      backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`}
      title={editing ? `Editing Article: ${article.title}` : 'Write an Article'}
    />

    {/* Main container */}
    <main className="main-content">
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12">
              <ul className="list-group">
                {errors.map(error => <li key={error.message} className="list-group-item text-danger">{error.message}</li>)}
              </ul>
              <form
                className="p-30 bg-gray rounded"
                method="POST"
                data-form="mailer"
                onSubmit={editing ? updateArticle : handleSubmit}
              >
                <div className="row">
                  <div className="form-group col-md-12 my-5">
                    <input type="file" className="form-control" onChange={handleInputChange} name="image" />
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={handleInputChange}
                      name="title"
                    />
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <select className="form-control form-control-lg" onChange={handleInputChange} name="category" value={category || ''}>
                      <option value>Select category</option>
                      {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <Editor
                    editorState={content}
                    onEditorStateChange={handleEditorState}
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-lg btn-primary" type="submit">{editing ? 'Update Article' : 'Create Article'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
    {/* END Main container */}
  </div>
);

CreateArticle.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
    messsage: PropTypes.string.isRequired,
  })).isRequired,
  content: PropTypes.objectOf(PropTypes.any).isRequired,
  editing: PropTypes.bool.isRequired,
  updateArticle: PropTypes.func.isRequired,
};

export default CreateArticle;
