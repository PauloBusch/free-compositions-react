import React from 'react';
import FieldBase from './../FieldBase';

export default class TextArea extends FieldBase {
  field() {
    return (
      <textarea { ...this.props.input } 
        className="form-control" 
        readOnly={ this.props.readOnly }
        rows={ this.props.rows || '5' }
        placeholder={ this.props.placeholder }>
      </textarea>
    );
  }
} 
