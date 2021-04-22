import './FormBase.css';

import React, { Component } from 'react';
import Card from '../../admin/partials/card/Card';
import CardHeader from '../../admin/partials/card/card-header/CardHeader';
import CardContent from '../../admin/partials/card/card-content/CardContent';
import CardFooter from '../../admin/partials/card/card-footer/CardFooter';
import SubmitButton from '../buttons/submit/SubmitButton';
import Loading from '../loading/Loading';

export default class FormBase extends Component { 
  constructor(props) {
    super(props);

    this.state = { loading: false, saveLoading: false };
    this.submit = this.submit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.afterLoad = this.afterLoad.bind(this);
    this.afterSubmit = this.afterSubmit.bind(this);
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
    this.state.loading = true;
    this.props.loadForm(id, this.afterLoad);
  }

  afterLoad(success) {
    if (success) this.toggleLoading(false);
  }

  toggleLoading(loading) {
    this.setState({ 
      ...this.state, 
      loading: loading
    });
  }

  getTitle() {
    if (this.id) {
      if (this.state.loading)
        return 'Carregando...';
      else
        return `Edição do ${this.title}`;
    }
    
    return `Cadastro de ${this.title}`;
  }

  submit(values) {
    this.toggleSaveLoading(true);
    if (this.id)
      this.props.update(values, this.afterSubmit);
    else
      this.props.create(values, this.afterSubmit);
  }
    
  afterSubmit(success) {
    this.toggleSaveLoading(false);
    if (success) this.goBack();
  }

  toggleSaveLoading(loading) {
    this.setState({ 
      ...this.state, 
      saveLoading: loading
    });
  }

  goBack() {
    const { router } = this.props;
    const { pathname } = router.location;
    const needBack = pathname.search(/\/edit\/|\/new/) !== -1;
    if (!needBack) return;
    
    const url = pathname.substring(0, pathname.search(/\/edit\/|\/new/));
    this.props.router.push(url);
  }

  render() {
    const { router } = this.props;
    const { pathname } = router.location;
    const needBack = pathname.search(/\/edit\/|\/new/) !== -1;
    return (
      <div className="page-base-form">
        <Card>
          <CardHeader>
            <h2>{ this.getTitle() }</h2>
            { needBack && <i title="Voltar" className="go-back fas fa-times" onClick={ this.goBack }></i> }
          </CardHeader>
          <CardContent>
            { this.state.loading ? <Loading /> : this.form() }
          </CardContent>
          <CardFooter>
            <SubmitButton text="SALVAR" loading={ this.state.saveLoading } onClick={ this.props.submitForm }/>
          </CardFooter>
        </Card>
      </div>
    );
  }
}
