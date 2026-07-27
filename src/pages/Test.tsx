import OptionList from "../components/elements/OptionsList";

export default function Test() {
  return (
    <div className="relative flex-1 flex flex-col">
      <OptionList 
        options={[
          { label: "Opción 1", value: 1 },
          { label: "Opción 2", value: 2 },
          { label: "Opción 3", value: 3 },
        ]}
        onSelect={(value) => {
          console.log("Selected value:", value)
        }}
        valueSelected={1}
      >
        Abrir lista de opciones
      </OptionList>
    </div>
  );
}