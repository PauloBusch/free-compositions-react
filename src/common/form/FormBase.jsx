import './FormBase.css';

import React, { Component } from 'react';
import Card from '../../admin/partials/card/Card';
import CardHeader from '../../admin/partials/card/card-header/CardHeader';
import CardContent from '../../admin/partials/card/card-content/CardContent';
import CardFooter from '../../admin/partials/card/card-footer/CardFooter';
import SubmitButton from '../buttons/submit/SubmitButton';

export default class FormBase extends Component { 
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.id = this.getId();
    if (this.id) {
      this.data = this.getData(this.id);
    }
  }

  form() { }

  getId() {
    const { router } = this.props;
    const { pathname } = router.location;
    const regex = /\/edit\//;
    const index = pathname.search(regex);
    if (index === -1) return null;
    return pathname.substring(index).replace(regex, '');
  }

  getData(id) { 
    this.props.loadForm(id);
  }

  getTitle() {
    if (this.id)
      return `Edição do ${this.title}`;
    
    return `Cadastro de ${this.title}`;
  }

  submit(values) {
    if (this.id)
      this.props.update(values);
    else
      this.props.create(values);

    this.goBack();
  }

  goBack() {
    const { router } = this.props;
    const { pathname } = router.location;
    const url = pathname.substring(0, pathname.search(/\/edit\/|\/new/));
    this.props.router.push(url);
  }

  render() {
    return (
      <div className="page-base-form">
        <Card>
          <CardHeader>
            <h2>{ this.getTitle() }</h2>
            <i title="Voltar" className="go-back fas fa-times" onClick={ this.goBack }></i>
          </CardHeader>
          <CardContent>
            { this.form() }
          </CardContent>
          <CardFooter>
            <SubmitButton text="SALVAR" onClick={ this.props.submitForm }/>
          </CardFooter>
        </Card>
      </div>
    );
  }
}
