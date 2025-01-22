import { BaseService, BaseDocument } from '../baseService';

export interface AssetType extends BaseDocument {
  // Aquí puedes agregar propiedades específicas de AssetType si las necesitas
}

class AssetTypeService extends BaseService<AssetType> {
  constructor() {
    super('asset_types');
  }
}

export const assetTypeService = new AssetTypeService();