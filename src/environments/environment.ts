export const environment = {
    production: false,
    api: {
      protocol: 'http',
      host: '192.168.25.7:8000',
      get url() {
        return `${this.protocol}://${this.host}/api`;
      }
    }
  };
