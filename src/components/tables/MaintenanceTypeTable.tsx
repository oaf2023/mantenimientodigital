import { useState } from "react";
import { BaseTable } from "./BaseTable";

interface MaintenanceType {
  id: string;
  name: string;
  description?: string;
}

export function MaintenanceTypeTable() {
  const [maintenanceTypes, setMaintenanceTypes] = useState<MaintenanceType[]>([]);

  const handleAdd = (item: Omit<MaintenanceType, "id">) => {
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
    };
    setMaintenanceTypes([...maintenanceTypes, newItem]);
  };

  const handleEdit = (item: MaintenanceType) => {
    setMaintenanceTypes(maintenanceTypes.map((type) => 
      type.id === item.id ? item : type
    ));
  };

  const handleDelete = (id: string) => {
    setMaintenanceTypes(maintenanceTypes.filter((type) => type.id !== id));
  };

  return (
    <BaseTable
      title="Modo de Mantenimiento"
      items={maintenanceTypes}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}