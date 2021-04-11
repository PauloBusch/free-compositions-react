import { initialize, submit } from 'redux-form';

import { MUSIC_FETCHED, MUSIC_DELETED } from './MusicsActionsTypes';
import { toastr } from 'react-redux-toastr';
import firebaseInstance from './../../firebase/index';
import 'firebase/firestore';

const type = 'música';
const formId = 'music-form';
const storage = firebaseInstance.storage();
const collection = firebaseInstance.firestore().collection('musics');

export function getAll(completed) {
  return dispatch => {
    collection.get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.createdAt - a.createdAt);
        const urlTasks = list.map(music => firebaseInstance.storage().ref(music.image).getDownloadURL());
        Promise.all(urlTasks).then(urlResults => {
          for (const index in list){
            list[index].imageRef = list[index].image;
            list[index].image = urlResults[index];
          }
          dispatch({ type: MUSIC_FETCHED, payload: list });
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
      const music = { id: doc.id, ...doc.data() };
      music.image = null;
      dispatch(initialize(formId, music));
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
    const pathImage = `images/musics/${values.image.name}`;
    storage.ref(pathImage).put(values.image).then(() => {
      const music = Object.assign(new Object(), values);
      music.createdAt = new Date();
      music.image = pathImage;
      collection.add(music).then(() => {
        toastr.success('Sucesso', `Música cadastrada com sucesso!`);
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
    const pathImage = `images/musics/${values.image.name}`;
    storage.ref(pathImage).put(values.image).then(() => {
      const music = Object.assign(new Object(), values);
      music.image = pathImage;
      collection.doc(values.id).update(music)
      .then(() => {
        toastr.success('Sucesso', `Música atualizada com sucesso!`);
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

export function remove(music, completed) {
  return dispatch => {
    storage.ref(music.imageRef).delete().then(() => {
      collection.doc(music.id).delete().then(doc => {
        dispatch({ type: MUSIC_DELETED, payload: music.id });
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

