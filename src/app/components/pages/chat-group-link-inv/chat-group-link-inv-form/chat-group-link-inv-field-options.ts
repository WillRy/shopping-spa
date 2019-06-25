import { FieldsOptions } from './../../../../Common/fields-options';
const fieldsOptions: FieldsOptions = {
    total: {
        id: 'total',
        label: 'Total de convites',
        validationMessage: {
          min: 1
        }
      },
      expires_at: {
        id: 'expires_at',
        label: 'Data de Expiração'
      }
};

export default fieldsOptions;
