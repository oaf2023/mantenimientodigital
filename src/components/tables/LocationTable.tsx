import { useState } from "react";
import { BaseTable } from "./BaseTable";

interface Location {
  id: string;
  name: string;
  description?: string;
}

export function LocationTable() {
  const [locations, setLocations] = useState<Location[]>([]);

  const handleAdd = (item: Omit<Location, "id">) => {
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
    };
    setLocations([...locations, newItem]);
  };

  const handleEdit = (item: Location) => {
    setLocations(locations.map((type) => 
      type.id === item.id ? item : type
    ));
  };

  const handleDelete = (id: string) => {
    setLocations(locations.filter((type) => type.id !== id));
  };

  return (
    <BaseTable
      title="Ubicación"
      items={locations}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}