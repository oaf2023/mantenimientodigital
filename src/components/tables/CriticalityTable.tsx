import { useState } from "react";
import { BaseTable } from "./BaseTable";

interface Criticality {
  id: string;
  name: string;
  description?: string;
}

export function CriticalityTable() {
  const [criticalities, setCriticalities] = useState<Criticality[]>([]);

  const handleAdd = (item: Omit<Criticality, "id">) => {
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
    };
    setCriticalities([...criticalities, newItem]);
  };

  const handleEdit = (item: Criticality) => {
    setCriticalities(criticalities.map((type) => 
      type.id === item.id ? item : type
    ));
  };

  const handleDelete = (id: string) => {
    setCriticalities(criticalities.filter((type) => type.id !== id));
  };

  return (
    <BaseTable
      title="Importancia Crítica"
      items={criticalities}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}