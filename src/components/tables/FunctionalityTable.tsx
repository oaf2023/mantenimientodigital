import { useState } from "react";
import { BaseTable } from "./BaseTable";

interface Functionality {
  id: string;
  name: string;
  description?: string;
}

export function FunctionalityTable() {
  const [functionalities, setFunctionalities] = useState<Functionality[]>([]);

  const handleAdd = (item: Omit<Functionality, "id">) => {
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
    };
    setFunctionalities([...functionalities, newItem]);
  };

  const handleEdit = (item: Functionality) => {
    setFunctionalities(functionalities.map((type) => 
      type.id === item.id ? item : type
    ));
  };

  const handleDelete = (id: string) => {
    setFunctionalities(functionalities.filter((type) => type.id !== id));
  };

  return (
    <BaseTable
      title="Funcionalidad"
      items={functionalities}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}