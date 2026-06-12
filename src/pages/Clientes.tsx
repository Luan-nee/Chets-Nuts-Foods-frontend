import { useState, useEffect } from "react";
import TableClientes from "../features/clientes/components/TableClientes";

export default function Clientes() {
  const [selectedClienteId, setSelectedClienteId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedClienteId !== null) {
      console.log("Cliente seleccionado ID:", selectedClienteId);
    }
  }, [selectedClienteId]);

  return <TableClientes setSelectedClienteId={setSelectedClienteId} />;
}