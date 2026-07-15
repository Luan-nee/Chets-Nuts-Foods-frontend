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
		label: "madre de dios",
		value: "MADRE DE DIOS",
		provincias: [
			{
				label: "tambopata",
				value: "TAMBOPATA",
				distritos: [
					{ label: "las piedras", value: "LAS PIEDRAS" },
					{ label: "inambari", value: "INAMBARI" },
					{ label: "laberinto", value: "LABERINTO" },
					{ label: "puerto maldonado", value: "PUERTO MALDONADO" },
				],
			},
			{
				label: "manu",
				value: "MANU",
				distritos: [
					{ label: "fitzcarrald", value: "FITZCARRALD" },
					{ label: "madre de dios", value: "MADRE DE DIOS" },
					{ label: "manu", value: "MANU" },
				],
			},
			{
				label: "tahuamanu",
				value: "TAHUAMANU",
				distritos: [
					{ label: "ipex", value: "IPEX" },
					{ label: "inta", value: "INTA" },
					{ label: "tahuamanu", value: "TAHUAMANU" },
				],
			},
		],
	},
	{
		label: "lima",
		value: "LIMA",
		provincias: [
			{
				label: "lima",
				value: "LIMA",
				distritos: [
					{ label: "miraflores", value: "MIRAFLORES" },
					{ label: "surco", value: "SURCO" },
					{ label: "san isidro", value: "SAN ISIDRO" },
				],
			},
			{
				label: "canta",
				value: "CANTA",
				distritos: [
					{ label: "canta", value: "CANTA" },
					{ label: "huamantanga", value: "HUAMANTANGA" },
					{ label: "santa rosa de quives", value: "SANTA ROSA DE QUIVES" },
				],
			},
			{
				label: "huaral",
				value: "HUARAL",
				distritos: [
					{ label: "huaral", value: "HUARAL" },
					{ label: "atavillos alto", value: "ATAVILLOS ALTO" },
					{ label: "sumbilca", value: "SUMBILCA" },
				],
			},
		],
	},
	{
		label: "cusco",
		value: "CUSCO",
		provincias: [
			{
				label: "cusco",
				value: "CUSCO",
				distritos: [
					{ label: "cusco", value: "CUSCO" },
					{ label: "santiago", value: "SANTIAGO" },
					{ label: "wanchaq", value: "WANCHAQ" },
				],
			},
			{
				label: "urubamba",
				value: "URUBAMBA",
				distritos: [
					{ label: "urubamba", value: "URUBAMBA" },
					{ label: "machupicchu", value: "MACHUPICCHU" },
					{ label: "maras", value: "MARAS" },
				],
			},
			{
				label: "espinar",
				value: "ESPINAR",
				distritos: [
					{ label: "espinar", value: "ESPINAR" },
					{ label: "coporaque", value: "COPORAQUE" },
					{ label: "ocoruro", value: "OCORURO" },
				],
			},
		],
	},
	{
		label: "arequipa",
		value: "AREQUIPA",
		provincias: [
			{
				label: "arequipa",
				value: "AREQUIPA",
				distritos: [
					{ label: "cercado", value: "CERCADO" },
					{ label: "yanahuara", value: "YANAHUARA" },
					{ label: "cayma", value: "CAYMA" },
				],
			},
			{
				label: "camana",
				value: "CAMANA",
				distritos: [
					{ label: "camana", value: "CAMANA" },
					{ label: "quilca", value: "QUILCA" },
					{ label: "mollendo", value: "MOLLENDO" },
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