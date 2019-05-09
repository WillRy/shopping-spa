export const environment = {
    production: false,
    api: {
      protocol: 'http',
      host: 'localhost:8000',
      get url() {
        return `${this.protocol}://${this.host}/api`;
      }
    }
  };
