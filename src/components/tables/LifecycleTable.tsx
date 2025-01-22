import { useState } from "react";
import { BaseTable } from "./BaseTable";

interface Lifecycle {
  id: string;
  name: string;
  description?: string;
}

export function LifecycleTable() {
  const [lifecycles, setLifecycles] = useState<Lifecycle[]>([]);

  const handleAdd = (item: Omit<Lifecycle, "id">) => {
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
    };
    setLifecycles([...lifecycles, newItem]);
  };

  const handleEdit = (item: Lifecycle) => {
    setLifecycles(lifecycles.map((type) => 
      type.id === item.id ? item : type
    ));
  };

  const handleDelete = (id: string) => {
    setLifecycles(lifecycles.filter((type) => type.id !== id));
  };

  return (
    <BaseTable
      title="Ciclo de Vida"
      items={lifecycles}
      onAdd={handleAdd}
      onEdit={handleDelete}
      onDelete={handleDelete}
    />
  );
}