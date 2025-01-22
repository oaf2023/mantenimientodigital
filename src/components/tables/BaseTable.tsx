import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TableItem {
  id: string;
  name: string;
  description?: string;
}

interface BaseTableProps {
  title: string;
  items: TableItem[];
  onAdd: (item: Omit<TableItem, "id">) => void;
  onEdit: (item: TableItem) => void;
  onDelete: (id: string) => void;
}

export function BaseTable({ title, items, onAdd, onEdit, onDelete }: BaseTableProps) {
  const [newItem, setNewItem] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAdd = () => {
    if (!newItem.name) {
      toast({
        title: "Error",
        description: "El nombre es requerido",
        variant: "destructive",
      });
      return;
    }

    onAdd(newItem);
    setNewItem({ name: "", description: "" });
    toast({
      title: "Éxito",
      description: "Item agregado correctamente",
    });
  };

  const handleEdit = (item: TableItem) => {
    if (editingId === item.id) {
      onEdit(item);
      setEditingId(null);
      toast({
        title: "Éxito",
        description: "Item actualizado correctamente",
      });
    } else {
      setEditingId(item.id);
    }
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    toast({
      title: "Éxito",
      description: "Item eliminado correctamente",
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Nombre"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <Input
          placeholder="Descripción"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Agregar
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {editingId === item.id ? (
                  <Input
                    value={item.name}
                    onChange={(e) => onEdit({ ...item, name: e.target.value })}
                  />
                ) : (
                  item.name
                )}
              </TableCell>
              <TableCell>
                {editingId === item.id ? (
                  <Input
                    value={item.description}
                    onChange={(e) => onEdit({ ...item, description: e.target.value })}
                  />
                ) : (
                  item.description
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}