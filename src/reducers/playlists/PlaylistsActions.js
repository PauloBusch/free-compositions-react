import { initialize, submit } from 'redux-form';

import { PLAYLIST_FETCHED, PLAYLIST_DELETED } from './PlaylistsActionsTypes';
import { toastr } from 'react-redux-toastr';
import firebaseInstance from './../../firebase/index';
import 'firebase/firestore';

const type = 'playlist';
const formId = 'playlist-form';
const storage = firebaseInstance.storage();
const collection = firebaseInstance.firestore().collection('playlists');

export function getById(id, completed) {
  return () => {
    collection.doc(id).get().then(doc => {
      const data = { id: doc.id, ...doc.data() };
      if (completed) completed(true, data);
    })
    .catch((error) => { 
      toastr.error('Erro', `Falha ao carregar playlist!`); 
      if (completed) completed(false);
      throw error;
    });
  };
}

export function getAll(completed) {
  return dispatch => {
    collection.get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.order - a.order);
        const listWithImage = list.filter(item => item.image);
        const urlTasks = listWithImage.map(item => storage.ref(item.image).getDownloadURL());
        Promise.all(urlTasks).then(urlResults => {
          for (const index in listWithImage){
            listWithImage[index].imageRef = listWithImage[index].image;
            listWithImage[index].image = urlResults[index];
          }
          dispatch({ type: PLAYLIST_FETCHED, payload: list });
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
      const data = { id: doc.id, ...doc.data() };
      data.image = null;
      dispatch(initialize(formId, data));
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
      const path = `images/playlists/${values.image.name}`;
      storage.ref(path).put(values.image).then(() => {
        const playlist = Object.assign(new Object(), values);
        playlist.createdAt = new Date();
        playlist.order = maxOrder + 1;
        playlist.image = path;
        collection.add(playlist)
          .then(() => {
            toastr.success('Sucesso', `Playlist cadastrada com sucesso!`);
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
    const path = `images/playlists/${values.image.name}`;
    storage.ref(path).put(values.image).then(() => {
      const playlist = Object.assign(new Object(), values);
      playlist.image = path;
      collection.doc(values.id).update(playlist)
        .then(() => {
          toastr.success('Sucesso', `Playlist atualizada com sucesso!`);
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

export function remove(playlist, completed) {
  return dispatch => {
    collection.doc(playlist.id).delete().then(doc => {
      dispatch({ type: PLAYLIST_DELETED, payload: playlist.id });
      if (completed) completed(true);
      storage.ref(playlist.imageRef).delete().then()
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
