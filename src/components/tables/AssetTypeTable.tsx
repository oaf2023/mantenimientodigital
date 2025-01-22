import { useState } from "react";
import { BaseTable } from "./BaseTable";

interface AssetType {
  id: string;
  name: string;
  description?: string;
}

export function AssetTypeTable() {
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);

  const handleAdd = (item: Omit<AssetType, "id">) => {
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
    };
    setAssetTypes([...assetTypes, newItem]);
  };

  const handleEdit = (item: AssetType) => {
    setAssetTypes(assetTypes.map((type) => 
      type.id === item.id ? item : type
    ));
  };

  const handleDelete = (id: string) => {
    setAssetTypes(assetTypes.filter((type) => type.id !== id));
  };

  return (
    <BaseTable
      title="Tipos de Activo"
      items={assetTypes}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}