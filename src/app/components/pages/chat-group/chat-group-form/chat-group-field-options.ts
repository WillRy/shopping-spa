import { FieldsOptions } from './../../../../Common/fields-options';
const fieldsOptions: FieldsOptions = {
    name: {
        id: 'name',
        label: 'Nome',
        validationMessage: {
          maxlength: 255
        }
      },
      photo: {
        id: 'photo',
        label: 'Foto'
      }
};

export default fieldsOptions;
