import { initialize, submit } from 'redux-form';

import { toastr } from 'react-redux-toastr';
import firebaseInstance from './../../firebase/index';
import 'firebase/firestore';

const formId = 'biography-form';
const storage = firebaseInstance.storage();
const collection = firebaseInstance.firestore().collection('users');

export function loadForm(id, completed) {
  return dispatch => {
    collection.doc(id).get().then(doc => {
      const userData = doc.data();
      if (!userData.image) {
        dispatch(initialize(formId, { id: doc.id, ...userData }));
        if (completed) completed(true);
        return;
      }
      storage.ref(userData.image).getDownloadURL().then(url => {
        userData.imageUrl = url;
        dispatch(initialize(formId, { id: doc.id, ...userData }));
        if (completed) completed(true);
      })
      .catch(() => {
        toastr.error('Erro', `Falha ao carregar imagem da biografia!`); 
        if (completed) completed(false);
      });
    })
    .catch((error) => {
      console.log(error); 
      toastr.error('Erro', `Falha ao carregar biografia!`); 
      if (completed) completed(false);
    });
  };
}

export function submitForm() {
  return submit(formId);
}

export function update(values, completed) {
  return () => {
    const save = image => {
      values.image = image;
      collection.doc(values.id).update(values)
      .then(() => {
        toastr.success('Sucesso', `Biografia atualizada com sucesso!`);
        if (completed) completed(true);
      })
      .catch(() => {
        toastr.error('Erro', `Falha ao atualizar Biografia!`);
        if (completed) completed(false);
      });
    };

    if (values.image instanceof File) {
      const pathImage = `images/users/${values.image.name}`;
      storage.ref(pathImage).put(values.image).then(() => {
        save(pathImage);
      })
      .catch(() => {
        toastr.error('Erro', `Falha ao enviar imagem!`);
        if (completed) completed(false);
      });
      return;
    }

    save(values.image);
  };
}
