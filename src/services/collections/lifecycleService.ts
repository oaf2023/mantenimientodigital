import { BaseService, BaseDocument } from '../baseService';

export interface Lifecycle extends BaseDocument {
  // Aquí puedes agregar propiedades específicas de Lifecycle si las necesitas
}

class LifecycleService extends BaseService<Lifecycle> {
  constructor() {
    super('lifecycles');
  }
}

export const lifecycleService = new LifecycleService();