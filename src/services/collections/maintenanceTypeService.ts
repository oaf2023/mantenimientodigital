import { BaseService, BaseDocument } from '../baseService';

export interface MaintenanceType extends BaseDocument {
  // Aquí puedes agregar propiedades específicas de MaintenanceType si las necesitas
}

class MaintenanceTypeService extends BaseService<MaintenanceType> {
  constructor() {
    super('maintenance_types');
  }
}

export const maintenanceTypeService = new MaintenanceTypeService();