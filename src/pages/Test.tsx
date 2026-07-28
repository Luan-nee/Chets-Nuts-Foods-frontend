import OptionList from "../components/elements/OptionsList";
import InputSearch from "../components/ui/InputSearch";
import { useState } from "react";

export default function Test() {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [objetSelected, setObjetSelected] = useState<any>(null);
  const atributos = ["atributo1", "atributo2", "atributo3"];
  const productos = [{
    id: 1,
    nombre: "Producto 1",
    atributo1: "Valor 1",
    atributo2: "Valor 2",
    atributo3: "Valor 3"
  },
  {
    id: 2,
    nombre: "Producto 2",
    atributo1: "Valor 1",
    atributo2: "Valor 2",
    atributo3: "Valor 3"
  }]

  return (
    <div className="relative flex-1 flex flex-col">
      <button 
        onClick={() => {
          console.log("TEST - VALOR SELECCIONADO:", selectedValue)
        }}
      >
        mostrar valor seleccionado: {selectedValue}
      </button>
      <OptionList 
        options={[
          { label: "Opción 1", value: 1 },
          { label: "Opción 2", value: 2 },
          { label: "Opción 3", value: 3 },
        ]}
        onSelect={(value) => {
          setSelectedValue(value as number);
          setObjetSelected(value);
        }}
        valueSelected={1}
      >
        Abrir lista de opciones
      </OptionList>

      <div className="">
        <h1>
          Modal de prueba
        </h1>
        <InputSearch 
          atributes={atributos}
          objets={productos}
          setObjetSelected={(object) => {
            console.log("Objeto seleccionado:", object);
          }}
          titulo=""
          placeholder=""
        />
      </div>
    </div>
  );
}