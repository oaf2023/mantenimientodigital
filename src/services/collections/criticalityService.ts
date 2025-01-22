import { BaseService, BaseDocument } from '../baseService';

export interface Criticality extends BaseDocument {
  // Aquí puedes agregar propiedades específicas de Criticality si las necesitas
}

class CriticalityService extends BaseService<Criticality> {
  constructor() {
    super('criticalities');
  }
}

export const criticalityService = new CriticalityService();