import './Image.css';

import React from 'react';
import FieldBase from '../FieldBase';

export default class Image extends FieldBase {
  constructor(props) {
    super(props);

    this.imageInput = null;
    this.state = { url: this.getBackgroundImage() };
    this.onChange = this.onChange.bind(this);
    this.getBackgroundImage = this.getBackgroundImage.bind(this);
    this.fileToBase64 = this.fileToBase64.bind(this);
    this.remove = this.remove.bind(this);
  }

  onChange(e) {
    const [file] = e.target.files;
    if (file) {
      this.fileToBase64(file, base64 => {
        this.setState({ ...this.state, url: base64 });
      });
      this.props.input.onChange(file);
    }
  }

  getBackgroundImage() {
    const { imageUrl, imageDefault } = this.props;
    return imageUrl || imageDefault;
  }

  fileToBase64(file, completed) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      completed(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  remove() {
    this.props.input.onChange(null);
    this.setState({ ...this.state, 
      url: this.props.imageDefault
    });
  }

  render() {
    const { label, name, className } = this.props;
    const errors = this.errors();

    return (
      <div 
        className={ `form-field ${errors ? 'has-error' : ''} ${className || ''}` }
        style={ this.getStyle() }
      >
        <label htmlFor={ name } style={ { textAlign: 'center' } }>{ label }</label>
        { this.fieldWithIcon() }
      </div>
    );
  }

  field() {
    const { className, imageDefault, input } = this.props;
    const hasImage = this.state.url !== imageDefault;
    const errors = this.errors();

    return (
      <div className={ `form-control image-input ${className}` } >
        <div className="image-background" style={ { backgroundImage: `url('${this.state.url}')` } }></div>
        <div className="actions">
          <button type="button" className="btn-add-image" onClick={ () => this.imageInput.click() }>{ hasImage ? 'Atualizar' : 'Adicionar' }</button>
          <button type="button" className="btn-del-image" disabled={ !hasImage } onClick={ this.remove }>Remover</button>
        </div>
        { errors }
        <input type="file" 
          ref={ ref => this.inputRef = ref }
          name={ input.name }
          style={ { display: 'none' } }
          accept="image/*"
          onChange={ this.onChange }
          ref={ el => this.imageInput = el }
        />
      </div>
    );
  }
}
