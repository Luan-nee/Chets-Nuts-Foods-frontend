interface FormUpdateEmpleadoProps {
  idEmpleado: number;
  setShowFormUpdateEmpleado: (p: boolean) => void;
}

export default function FormUpdateEmpleado({ idEmpleado, setShowFormUpdateEmpleado }: FormUpdateEmpleadoProps ) {
  return (
    <div>
      <h2>Formulario de actualización de empleado</h2>
      <p>ID del empleado a actualizar: {idEmpleado}</p>
      <button onClick={() => setShowFormUpdateEmpleado(false)}>Cerrar formulario</button>
    </div>
  )
}