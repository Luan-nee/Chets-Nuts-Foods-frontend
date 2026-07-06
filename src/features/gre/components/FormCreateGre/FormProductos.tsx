import { useState } from 'react';
import ButtonSubmitForm from '../../../../components/ui/ButtonSubmitForm';
import ButtonCancelForm from '../../../../components/ui/ButtonCancelForm';
import { useRegistrarProductoEnPaquete } from '../../../paquetes/hooks/useRegistrarProductoEnPaquete';
import type { ProductoEnPaquete } from '../../../../types/constantes.type';
import TableSelectProductos from '../../../productos/components/TableSelectProductos';

export default function FormProductos () {
  const [formData, setFormData] = useState<ProductoEnPaquete[]>([]);
  const { 
    isLoading: isLoadingProductos, 
    isError: isErrorProductos, 
    execute: registrarProductoEnPaquete
  } = useRegistrarProductoEnPaquete();

  return (
    <div className="px-6 py-4 bg-gray-900 mx-6">
      <div className='flex gap-2'>
        <ButtonSubmitForm 
          isError={isErrorProductos}
          isLoading={isLoadingProductos}
          textButton="Registrar productos en paquete"
          textError='Error al registrar productos en paquete'
          color='blue'
          handleSubmit={async () => {
            await registrarProductoEnPaquete(formData, 1); // Aquí se pasa el ID del paquete (1) como ejemplo
            console.log('Productos registrados en paquete:', formData);
          }}
        />
        <ButtonCancelForm 
        handleCancel={() => {}}
        isLoading={isLoadingProductos}
        textButton="Cancelar"
        color='red'
        />

      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
        onClick={() => {
          console.log('Productos seleccionados:', formData);
        }}
      >
        VER DATOS DE PRODUCTOS
      </button>
      <TableSelectProductos
        setListProductsSelected={setFormData}
        listProductsSelected={formData}
      />
    </div>
  );
}