import './text-editor.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import React from 'react';
import FieldBase from './../FieldBase';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from './draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export default class TextEditor extends FieldBase {
  constructor(props) {
    super(props);
    
    const block = htmlToDraft(this.props.input.value);
    const content = ContentState.createFromBlockArray(block.contentBlocks);
    this.state = { editorState: EditorState.createWithContent(content) };
    this.onChange = this.onChange.bind(this);
    this.getRawHtml = this.getRawHtml.bind(this);
  }

  onChange(editorState) {
    this.setState({ ...this.state, editorState });
    const html = this.getRawHtml(editorState);
    this.props.input.onChange(html);
  }

  getRawHtml(editorState) {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }

  field() {
    return (
      <div>
        <Editor placeholder={ this.props.placeholder }
          wrapperClassName="text-editor-container form-control"
          editorClassName="text-editor-content"
          defaultEditorState={ this.state.editorState }
          onEditorStateChange={ this.onChange }
          localization={ { locale: 'pt' } }
          toolbar={ {
            options: ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'history'],
            inline: { options: ['bold', 'italic', 'underline'] },
            fontSize: { options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30] }
          } }
        />
        <input { ...this.props.input } 
          readOnly={ this.props.readOnly } 
          value={ this.getRawHtml(this.state.editorState) }
          type="hidden"/>
      </div>
    );
  }
} 
