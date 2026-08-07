export function useGenerarCoordenadasUnicas() {
	const marcaTiempo = Date.now();
	const aleatorio = Math.floor(Math.random() * 1_000_000);
	const semilla = `${marcaTiempo}${aleatorio.toString().padStart(6, "0")}`;
	const latitudBase = 2 + Number(semilla.slice(-6)) / 1_000_000;
	const longitudBase = 76 + Number(semilla.slice(-12, -6)) / 1_000_000;
	return {
		latitud: `-${latitudBase.toFixed(6)}`,
		longitud: `-${longitudBase.toFixed(6)}`,
	};
}