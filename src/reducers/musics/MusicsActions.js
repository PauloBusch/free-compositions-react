import { initialize, submit } from 'redux-form';

import { MUSIC_FETCHED, MUSIC_DELETED } from './MusicsActionsTypes';
import { toastr } from 'react-redux-toastr';
import firebaseInstance from './../../firebase/index';
import 'firebase/firestore';
import { MUSIC_ARCHIVED, MUSIC_PUBLIC, MUSIC_SOLD } from './MusicStatus';

const type = 'música';
const formId = 'music-form';
const collection = firebaseInstance.firestore().collection('musics');

export function getById(id, completed) {
  return () => {
    collection.doc(id).get().then(doc => {
      const data = { id: doc.id, ...doc.data() };
      if (data.expirationLink) data.expirationLink = data.expirationLink.toDate(); 
      if (completed) completed(true, data);
    })
    .catch((error) => { 
      toastr.error('Erro', `Falha ao carregar ${type}!`);
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

export function getAllByFilter(filters, completed) {
  return () => {
    let filtred = collection;

    if (filters) {
      if (filters.compositor)
        filtred = filtred.where('compositors', 'array-contains', filters.compositor);
      if (filters.status)
        filtred = filtred.where('status', '==', filters.status);
    }

    filtred.get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.order - a.order);
      list.forEach(d => {
        if (d.expirationLink) 
          d.expirationLink = d.expirationLink.toDate(); 
      });
      if (completed) completed(true, list);
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
    collection
    .where('status', '==', MUSIC_PUBLIC)
    .get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.order - a.order);      
      if (completed) completed(true, list.slice(0, 12));
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
    collection
    .where('playlist', '==', playlist)
    .where('status', '==', MUSIC_PUBLIC)
    .get().then(result => {
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
    collection
    .where('genre', '==', genre)
    .where('status', '==', MUSIC_PUBLIC)
    .get().then(result => {
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
    collection
    .where('compositors', 'array-contains', compositor)
    .where('status', '==', MUSIC_PUBLIC)
    .get().then(result => {
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
  return () => {
    collection.orderBy('order', 'desc').limit(1).get().then(doc => { 
      const maxOrder = doc.size > 0 ? doc.docs[0].data().order : 0;
      const music = Object.assign(new Object(), values);
      music.createdAt = new Date();
      music.order = maxOrder + 1;
      collection.add(music).then(() => {
        toastr.success('Sucesso', `Música cadastrada com sucesso!`);
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
  return () => {
    const music = Object.assign(new Object(), values);
    collection.doc(values.id).update(music)
    .then(() => {
      toastr.success('Sucesso', `Música atualizada com sucesso!`);
      if (completed) completed(true);
    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao atualizar ${type}!`);
      if (completed) completed(false);
      throw error;
    });
  };
}

export function changeStatus(id, status, completed) {
  return () => {
    collection.doc(id).update({ status })
    .then(() => {
      if (completed) completed(true);
    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao alterar status da ${type}!`);
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

export function updateOrderBulk(list, completed) {
  return () => {
    var batch = firebaseInstance.firestore().batch();

    for (const item of list) {
      const record = collection.doc(item.id);
      batch.update(record, { order: item.order });
    }
    
    return batch.commit().then(() => {
      toastr.success('Sucesso', `Ordem atualizada com sucesso!`);
      if (completed) completed(true);
    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao atualizar ordem!`);
      if (completed) completed(false);
      throw error;
    });
  };
}

export function archiveByCompositor(user, completed) {
  return () => {
    collection
    .where('status', '!=', MUSIC_SOLD)
    .where('compositors', 'array-contains', user.name)
    .get().then(result => {
      const batch = firebaseInstance.firestore().batch();

      for (const doc of result.docs)
        batch.update(doc.ref, { status: MUSIC_ARCHIVED });
      
      return batch.commit().then(() => {
        if (completed) completed(true);
      })
      .catch((error) => {
        if (completed) completed(false);
        throw error;
      });

    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao carregar ${type}s!`);
      if (completed) completed(false);
      throw error;
    });
  };
}
