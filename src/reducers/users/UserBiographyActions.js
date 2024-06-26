import { initialize, submit } from 'redux-form';

import { toastr } from 'react-redux-toastr';
import firebaseInstance from './../../firebase/index';
import 'firebase/firestore';
import 'firebase/storage';

const formId = 'biography-form';
const storage = firebaseInstance.storage();
const collection = firebaseInstance.firestore().collection('users');

export function loadForm(id, completed) {
  return dispatch => {
    collection.doc(id).get().then(doc => {
      const userData = { id: doc.id, ...doc.data() };
      if (!userData.image) {
        dispatch(initialize(formId, userData));
        if (completed) completed(true, userData);
        return;
      }
      storage.ref(userData.image).getDownloadURL().then(url => {
        userData.imageUrl = url;
        dispatch(initialize(formId, userData));
        if (completed) completed(true, userData);
      })
      .catch((error) => {
        toastr.error('Erro', `Falha ao carregar imagem da biografia!`); 
        if (completed) completed(false);
        throw error;
      });
    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao carregar biografia!`); 
      if (completed) completed(false);
      throw error;
    });
  };
}

export function submitForm() {
  return submit(formId);
}

export function update(values, completed) {
  return () => {
    const save = image => {
      if (image) values.image = image;
      if (values.imageUrl) delete values.imageUrl;
      collection.doc(values.id).update(values)
      .then(() => {
        toastr.success('Sucesso', `Biografia atualizada com sucesso!`);
        if (completed) completed(true);
      })
      .catch((error) => {
        toastr.error('Erro', `Falha ao atualizar Biografia!`);
        if (completed) completed(false);
        throw error;
      });
    };

    if (values.image instanceof File) {
      const pathImage = `images/users/${values.image.name}`;
      storage.ref(pathImage).put(values.image).then(() => save(pathImage))
      .catch((error) => {
        toastr.error('Erro', `Falha ao enviar imagem!`);
        if (completed) completed(false);
        throw error;
      });
      return;
    }

    save(values.image);
  };
}
