import { initialize, submit } from 'redux-form';
import { toastr } from 'react-redux-toastr';
import { SLIDE_FETCHED, SLIDE_DELETED } from './SlidesActionsTypes';
import firebaseInstance from './../../firebase/index';
import 'firebase/firestore';

const type = 'slide';
const formId = 'slide-form';
const storage = firebaseInstance.storage();
const collection = firebaseInstance.firestore().collection('slides');
var slides = [];

export function getAll(completed) {
  return dispatch => {
    collection.get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }));
      const urlTasks = list.map(slide => firebaseInstance.storage().ref(slide.image).getDownloadURL());
      Promise.all(urlTasks).then(urlResults => {
        for (const index in list){
          list[index].imageRef = list[index].image;
          list[index].image = urlResults[index];
        }
        slides = list.sort((a, b) => b.order - a.order);
        dispatch({ type: SLIDE_FETCHED, payload: list });
        if (completed) completed(true);
      });
    })
    .catch(() => {
      toastr.error('Erro', `Falha ao carregar ${type}s!`);
      if (completed) completed(false);
    });
  };
}

export function loadForm(id, completed) {
  return dispatch => {
    collection.doc(id).get().then(doc => {
      const slide = { id: doc.id, ...doc.data() };
      slide.image = null;
      dispatch(initialize(formId, slide));
      if (completed) completed(true);
    })
    .catch(() => { 
      toastr.error('Erro', `Falha ao carregar ${type}!`); 
      if (completed) completed(false);
    });
  };
}

export function submitForm() {
  return submit(formId);
}

export function create(values, completed) {
  return dispatch => {
    const pathSlide = `images/slides/${values.image.name}`;
    storage.ref(pathSlide).put(values.image).then(() => {
      const slide = Object.assign(new Object(), values);
      slide.image = pathSlide;
      slide.order = getMaxOrder() + 1;
      collection.add(slide)
      .then(() => {
        toastr.success('Sucesso', `Slide cadastrado com sucesso!`);
        dispatch(getAll());
        if (completed) completed(true);
      })
      .catch(() => {
        toastr.error('Erro', `Falha ao criar ${type}!`);
        if (completed) completed(false);
      });
    })
    .catch(() => {
      toastr.error('Erro', `Falha ao enviar ${type}!`);
      if (completed) completed(false);
    });
  };
}

export function update(values, completed) {
  return dispatch => {
    const pathSlide = `images/slides/${values.image.name}`;
    storage.ref(pathSlide).put(values.image).then(() => {
      const slide = Object.assign(new Object(), values);
      slide.image = pathSlide;
      collection.doc(values.id).update(slide)
      .then(() => {
        toastr.success('Sucesso', `Slide atualizado com sucesso!`);
        dispatch(getAll());
        if (completed) completed(true);
      })
      .catch(() => {
        toastr.error('Erro', `Falha ao atualizar ${type}!`);
        if (completed) completed(false);
      });
    })
    .catch(() => {
      toastr.error('Erro', `Falha ao enviar imagem!`);
      if (completed) completed(false);
    });
  };
}

export function remove(slide, completed) {
  return dispatch => {
    storage.ref(slide.imageRef).delete().then(() => {
      collection.doc(slide.id).delete().then(doc => {
        dispatch({ type: SLIDE_DELETED, payload: slide.id });
        if (completed) completed(true);
      })
      .catch(() => {
        toastr.error('Erro', `Falha ao remover ${type}!`);
        if (completed) completed(false);
      });
    })
    .catch(() => {
      toastr.error('Erro', `Falha ao remover imagem!`);
      if (completed) completed(false);
    });
  };
}

function getMaxOrder() {
  if (!slides || slides.length === 0) return 0;
  let max = slides[0].order;
  for (const slide of slides)
    if (slide.order > max) max = slide.order;
  return max;
}
