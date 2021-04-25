import { initialize, submit } from 'redux-form';

import { MUSIC_FETCHED, MUSIC_DELETED } from './MusicsActionsTypes';
import { toastr } from 'react-redux-toastr';
import firebaseInstance from './../../firebase/index';
import 'firebase/firestore';

const type = 'música';
const formId = 'music-form';
const collection = firebaseInstance.firestore().collection('musics');

export function getAll(completed) {
  return dispatch => {
    collection.get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.order - a.order);      
      dispatch({ type: MUSIC_FETCHED, payload: list });
      if (completed) completed(true);
    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao carregar ${type}s!`);
      if (completed) completed(false);
      throw error;
    });
  };
}

export function getAllByRanking(completed) {
  return () => {
    collection.get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.order - a.order);      
      if (completed) completed(true, list);
    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao carregar ranking!`);
      if (completed) completed(false);
      throw error;
    });
  };
}

export function getAllByPlaylist(playlist, completed) {
  return dispatch => {
    collection.where('playlist', '==', playlist).get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.order - a.order);      
      dispatch({ type: MUSIC_FETCHED, payload: list });
      if (completed) completed(true, list);
    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao carregar ${type}s!`);
      if (completed) completed(false);
      throw error;
    });
  };
}

export function getAllByGenre(genre, completed) {
  return dispatch => {
    collection.where('genre', '==', genre).get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.order - a.order);      
      dispatch({ type: MUSIC_FETCHED, payload: list });
      if (completed) completed(true, list);
    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao carregar ${type}s!`);
      if (completed) completed(false);
      throw error;
    });
  };
}

export function getAllByCompositor(compositor, completed) {
  return dispatch => {
    collection.where('compositor', '==', compositor).get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.order - a.order);      
      dispatch({ type: MUSIC_FETCHED, payload: list });
      if (completed) completed(true, list);
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
      const music = { id: doc.id, ...doc.data() };
      dispatch(initialize(formId, music));
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
      const music = Object.assign(new Object(), values);
      music.createdAt = new Date();
      music.order = maxOrder + 1;
      collection.add(music).then(() => {
        toastr.success('Sucesso', `Música cadastrada com sucesso!`);
        dispatch(getAll());
        if (completed) completed(true);
      })
      .catch((error) => {
        toastr.error('Erro', `Falha ao criar ${type}!`);
        if (completed) completed(false);
        throw error;
      });
    });
  };
}

export function update(values, completed) {
  return dispatch => {
    const music = Object.assign(new Object(), values);
    collection.doc(values.id).update(music)
    .then(() => {
      toastr.success('Sucesso', `Música atualizada com sucesso!`);
      dispatch(getAll());
      if (completed) completed(true);
    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao atualizar ${type}!`);
      if (completed) completed(false);
      throw error;
    });
  };
}

export function remove(music, completed) {
  return dispatch => {
    collection.doc(music.id).delete().then(doc => {
      dispatch({ type: MUSIC_DELETED, payload: music.id });
      if (completed) completed(true);
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
