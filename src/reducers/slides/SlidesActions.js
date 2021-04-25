import { initialize, submit } from 'redux-form';
import { toastr } from 'react-redux-toastr';
import { SLIDE_FETCHED, SLIDE_DELETED } from './SlidesActionsTypes';
import firebaseInstance from './../../firebase/index';
import 'firebase/firestore';
import 'firebase/storage';

const type = 'slide';
const formId = 'slide-form';
const storage = firebaseInstance.storage();
const collection = firebaseInstance.firestore().collection('slides');

export function getAll(completed) {
  return dispatch => {
    collection.get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => a.order - b.order);
      const urlTasks = list.map(slide => firebaseInstance.storage().ref(slide.image).getDownloadURL());
      Promise.all(urlTasks).then(urlResults => {
        for (const index in list){
          list[index].imageRef = list[index].image;
          list[index].image = urlResults[index];
        }
        dispatch({ type: SLIDE_FETCHED, payload: list });
        if (completed) completed(true);
      });
    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao carregar ${type}s!`);
      if (completed) completed(false);
      throw error;
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
    .catch((error) => { 
      toastr.error('Erro', `Falha ao carregar ${type}!`); 
      if (completed) completed(false);
      throw error;
    });
  };
}

export function submitForm() {
  return submit(formId);
}

export function create(values, completed) {
  return dispatch => {
    collection.orderBy('order', 'desc').limit(1).get().then(doc => { 
      const maxOrder = doc.size > 0 ? doc.docs[0].data().order : 0;
      const pathSlide = `images/slides/${values.image.name}`;
      storage.ref(pathSlide).put(values.image).then(() => {
        const slide = Object.assign(new Object(), values);
        slide.createdAt = new Date();
        slide.order = maxOrder + 1;
        slide.image = pathSlide;
        collection.add(slide)
          .then(() => {
            toastr.success('Sucesso', `Slide cadastrado com sucesso!`);
            dispatch(getAll());
            if (completed) completed(true);
          })
          .catch((error) => {
            toastr.error('Erro', `Falha ao criar ${type}!`);
            if (completed) completed(false);
            throw error;
          });
      })
      .catch((error) => {
        toastr.error('Erro', `Falha ao enviar ${type}!`);
        if (completed) completed(false);
        throw error;
      });
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
        .catch((error) => {
          toastr.error('Erro', `Falha ao atualizar ${type}!`);
          if (completed) completed(false);
          throw error;
        });
    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao enviar imagem!`);
      if (completed) completed(false);
      throw error;
    });
  };
}

export function remove(slide, completed) {
  return dispatch => {
    collection.doc(slide.id).delete().then(doc => {
      dispatch({ type: SLIDE_DELETED, payload: slide.id });
      if (completed) completed(true);
      storage.ref(slide.imageRef).delete().then()
        .catch((error) => {
          toastr.error('Erro', `Falha ao remover imagem!`);
          if (completed) completed(false);
          throw error;
        });
    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao remover ${type}!`);
      if (completed) completed(false);
      throw error;
    });
  };
}

export function updateOrderBulk(list) {
  return dispatch => {
    var batch = firebaseInstance.firestore().batch();

    for (const item of list) {
      const record = collection.doc(item.id);
      batch.update(record, { order: item.order });
    }
    
    return batch.commit().then(() => {
      toastr.success('Sucesso', `Ordem atualizada com sucesso!`);
      dispatch(getAll());
    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao atualizar ordem!`);
      throw error;
    });
  };
}
