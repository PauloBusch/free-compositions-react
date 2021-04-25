import { initialize, submit } from 'redux-form';

import { ARTIST_FETCHED } from './ArtistsActionsTypes';
import { toastr } from 'react-redux-toastr';
import firebaseInstance from './../../../firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const storage = firebaseInstance.storage();
const collection = firebaseInstance.firestore().collection('users');

export function getAll(completed) {
  return dispatch => {
    collection.where('role', '==', 'Compositor').get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.createdAt - a.createdAt);
        const listWithImage = list.filter(item => item.image);
        const urlTasks = listWithImage.map(item => storage.ref(item.image).getDownloadURL());
        Promise.all(urlTasks).then(urlResults => {
          for (const index in listWithImage){
            listWithImage[index].imageRef = listWithImage[index].image;
            listWithImage[index].image = urlResults[index];
          }
          dispatch({ type: ARTIST_FETCHED, payload: list });
          if (completed) completed(true);
        });
    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao carregar artistas!`);
      if (completed) completed(false);
      throw error;
    });
  };
}
