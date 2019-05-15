import {
  FieldsOptions
} from '../../../../Common/fields-options';
const fieldsOptions: FieldsOptions = {
  name: {
    id: 'name',
    label: 'Nome',
    validationMessage: {
      maxlength: 255
    }
  },
  email: {
    id: 'email',
    label: 'Email'
  },
  password: {
    id: 'password',
    label: 'Senha'
  }

};

export default fieldsOptions;
