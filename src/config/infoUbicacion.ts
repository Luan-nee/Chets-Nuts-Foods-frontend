export type UbicacionOption = {
	label: string;
	value: string;
};

type ProvinciaUbicacion = UbicacionOption & {
	distritos: UbicacionOption[];
};

type DepartamentoUbicacion = UbicacionOption & {
	provincias: ProvinciaUbicacion[];
};

export const ubicacionesPeru: DepartamentoUbicacion[] = [
	{
		label: "MADRE DE DIOS",
		value: "MADRE DE DIOS",
		provincias: [
			{
				label: "TAMBOPATA",
				value: "TAMBOPATA",
				distritos: [
					{ label: "LAS PIEDRAS", value: "LAS PIEDRAS" },
					{ label: "INAMBARI", value: "INAMBARI" },
					{ label: "LABERINTO", value: "LABERINTO" },
					{ label: "PUERTO MALDONADO", value: "PUERTO MALDONADO" },
				],
			},
			{
				label: "MANU",
				value: "MANU",
				distritos: [
					{ label: "FITZCARRALD", value: "FITZCARRALD" },
					{ label: "MADRE DE DIOS", value: "MADRE DE DIOS" },
					{ label: "MANU", value: "MANU" },
				],
			},
			{
				label: "TAHUAMANU",
				value: "TAHUAMANU",
				distritos: [
					{ label: "IPEX", value: "IPEX" },
					{ label: "INTA", value: "INTA" },
					{ label: "TAHUAMANU", value: "TAHUAMANU" },
				],
			},
		],
	},
	{
		label: "LIMA",
		value: "LIMA",
		provincias: [
			{
				label: "LIMA",
				value: "LIMA",
				distritos: [
					{ label: "MIRAFLORES", value: "MIRAFLORES" },
					{ label: "SURCO", value: "SURCO" },
					{ label: "SAN ISIDRO", value: "SAN ISIDRO" },
				],
			},
			{
				label: "CANTA",
				value: "CANTA",
				distritos: [
					{ label: "CANTA", value: "CANTA" },
					{ label: "HUAMANTANGA", value: "HUAMANTANGA" },
					{ label: "SANTA ROSA DE QUIVES", value: "SANTA ROSA DE QUIVES" },
				],
			},
			{
				label: "HUARAL",
				value: "HUARAL",
				distritos: [
					{ label: "HUARAL", value: "HUARAL" },
					{ label: "ATAVILLOS ALTO", value: "ATAVILLOS ALTO" },
					{ label: "SUMBILCA", value: "SUMBILCA" },
				],
			},
		],
	},
	{
		label: "CUSCO",
		value: "CUSCO",
		provincias: [
			{
				label: "CUSCO",
				value: "CUSCO",
				distritos: [
					{ label: "CUSCO", value: "CUSCO" },
					{ label: "SANTIAGO", value: "SANTIAGO" },
					{ label: "WANCHAQ", value: "WANCHAQ" },
				],
			},
			{
				label: "URUBAMBA",
				value: "URUBAMBA",
				distritos: [
					{ label: "URUBAMBA", value: "URUBAMBA" },
					{ label: "MACHUPICCHU", value: "MACHUPICCHU" },
					{ label: "MARAS", value: "MARAS" },
				],
			},
			{
				label: "ESPINAR",
				value: "ESPINAR",
				distritos: [
					{ label: "ESPINAR", value: "ESPINAR" },
					{ label: "COPORAQUE", value: "COPORAQUE" },
					{ label: "OCORURO", value: "OCORURO" },
				],
			},
		],
	},
	{
		label: "AREQUIPA",
		value: "AREQUIPA",
		provincias: [
			{
				label: "AREQUIPA",
				value: "AREQUIPA",
				distritos: [
					{ label: "CERCADO", value: "CERCADO" },
					{ label: "YANAHUARA", value: "YANAHUARA" },
					{ label: "CAYMA", value: "CAYMA" },
				],
			},
			{
				label: "CAMANA",
				value: "CAMANA",
				distritos: [
					{ label: "CAMANA", value: "CAMANA" },
					{ label: "QUILCA", value: "QUILCA" },
					{ label: "MOLLENDO", value: "MOLLENDO" },
				],
			},
		],
	},
];

export const departamentos: UbicacionOption[] = ubicacionesPeru.map(({ provincias, ...departamento }) => departamento);

export const getProvinciasByDepartamento = (departamentoValue: string): UbicacionOption[] => {
	return ubicacionesPeru.find((departamento) => departamento.value === departamentoValue)?.provincias.map(({ distritos, ...provincia }) => provincia) ?? [];
};

export const getDistritosByProvincia = (departamentoValue: string, provinciaValue: string): UbicacionOption[] => {
	return ubicacionesPeru
		.find((departamento) => departamento.value === departamentoValue)
		?.provincias.find((provincia) => provincia.value === provinciaValue)?.distritos ?? [];
};