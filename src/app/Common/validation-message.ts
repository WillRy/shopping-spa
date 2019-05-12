const messages = {
    required: ':name é requerido',
    maxlength: ':name precisa ter no máximo :maxlength caracteres',
    minlength: ':name pode ter no mínimo :minlength caracteres',
    email: ':name não é um email'
};

export class ValidationMessage {

    static getMessage(error: string, replaceTokens: Array<any>) {
        let message = messages[error];
        const tokens = message.match(/\:[a-z]+/g);
        tokens.forEach((token, index) => message = message.replace(token, replaceTokens[index]));
        return message;
    }
}
