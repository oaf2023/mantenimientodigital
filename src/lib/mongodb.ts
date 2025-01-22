class MongoDBConfig {
  private static instance: MongoDBConfig;
  private _uri: string = 'mongodb://localhost:27017';

  private constructor() {
    this.loadConfig();
  }

  public static getInstance(): MongoDBConfig {
    if (!MongoDBConfig.instance) {
      MongoDBConfig.instance = new MongoDBConfig();
    }
    return MongoDBConfig.instance;
  }

  private loadConfig() {
    const storageConfig = localStorage.getItem('storageConfig');
    if (storageConfig) {
      const { storageType, path } = JSON.parse(storageConfig);
      
      switch (storageType) {
        case 'local':
          this._uri = 'mongodb://localhost:27017';
          break;
        case 'server':
          this._uri = `mongodb://${path}:27017`;
          break;
        case 'cloud':
          this._uri = path;
          break;
        default:
          console.log('Usando configuración local por defecto');
      }
    }
    console.log('URI de MongoDB configurada:', this._uri);
  }

  get uri(): string {
    return this._uri;
  }

  updateConfig(config: { storageType: string; path: string }) {
    localStorage.setItem('storageConfig', JSON.stringify(config));
    this.loadConfig();
  }
}

export const mongoConfig = MongoDBConfig.getInstance();