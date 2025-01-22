import { BaseService, BaseDocument } from '../baseService';

export interface Location extends BaseDocument {
  // Aquí puedes agregar propiedades específicas de Location si las necesitas
}

class LocationService extends BaseService<Location> {
  constructor() {
    super('locations');
  }
}

export const locationService = new LocationService();