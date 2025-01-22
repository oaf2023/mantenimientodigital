import { BaseService, BaseDocument } from '../baseService';

export interface Functionality extends BaseDocument {
  // Aquí puedes agregar propiedades específicas de Functionality si las necesitas
}

class FunctionalityService extends BaseService<Functionality> {
  constructor() {
    super('functionalities');
  }
}

export const functionalityService = new FunctionalityService();