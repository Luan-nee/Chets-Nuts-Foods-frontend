type model = { label: string; value: string };

type marcaModeloVehiculo = {
  label: string;
  value: string;
  models: model[];
}

export const marcasModelosVehiculos: marcaModeloVehiculo[] = [
  {
    label: "Volvo",
    value: "volvo",
    models: [
      { label: "FH", value: "fh" },
      { label: "FM", value: "fm" },
      { label: "FMX", value: "fmx" },
      { label: "VM", value: "vm" }
    ]
  },
  {
    label: "Scania",
    value: "scania",
    models: [
      { label: "Serie R", value: "serie-r" },
      { label: "Serie S", value: "serie-s" },
      { label: "Serie G", value: "serie-g" },
      { label: "Serie P", value: "serie-p" },
      { label: "Serie XT", value: "serie-xt" }
    ]
  },
  {
    label: "Mercedes-Benz",
    value: "mercedes-benz",
    models: [
      { label: "Actros", value: "actros" },
      { label: "Arocs", value: "arocs" },
      { label: "Atego", value: "atego" },
      { label: "Axor", value: "axor" }
    ]
  },
  {
    label: "MAN",
    value: "man",
    models: [
      { label: "TGX", value: "tgx" },
      { label: "TGS", value: "tgs" },
      { label: "TGM", value: "tgm" },
      { label: "TGL", value: "tgl" }
    ]
  },
  {
    label: "DAF",
    value: "daf",
    models: [
      { label: "XF", value: "xf" },
      { label: "CF", value: "cf" },
      { label: "XG", value: "xg" }
    ]
  },
  {
    label: "Iveco",
    value: "iveco",
    models: [
      { label: "Stralis", value: "stralis" },
      { label: "S-Way", value: "s-way" },
      { label: "Trakker", value: "trakker" },
      { label: "Tector", value: "tector" }
    ]
  },
  {
    label: "International",
    value: "international",
    models: [
      { label: "LT", value: "lt" },
      { label: "ProStar", value: "prostar" },
      { label: "HV", value: "hv" },
      { label: "MV", value: "mv" },
      { label: "LoneStar", value: "lonestar" }
    ]
  },
  {
    label: "Freightliner",
    value: "freightliner",
    models: [
      { label: "Cascadia", value: "cascadia" },
      { label: "M2 106", value: "m2-106" },
      { label: "M2 112", value: "m2-112" },
      { label: "114SD", value: "114sd" }
    ]
  },
  {
    label: "Kenworth",
    value: "kenworth",
    models: [
      { label: "T680", value: "t680" },
      { label: "T880", value: "t880" },
      { label: "T800", value: "t800" },
      { label: "W900", value: "w900" }
    ]
  },
  {
    label: "Mack",
    value: "mack",
    models: [
      { label: "Anthem", value: "anthem" },
      { label: "Granite", value: "granite" },
      { label: "Pinnacle", value: "pinnacle" }
    ]
  },
  {
    label: "Hino",
    value: "hino",
    models: [
      { label: "Serie 500", value: "serie-500" },
      { label: "Serie 700", value: "serie-700" }
    ]
  },
  {
    label: "Isuzu",
    value: "isuzu",
    models: [
      { label: "Forward (Serie F)", value: "forward-serie-f" },
      { label: "Giga (Serie C/E)", value: "giga-serie-c-e" }
    ]
  },
  {
    label: "Fuso",
    value: "fuso",
    models: [
      { label: "FJ", value: "fj" },
      { label: "FZ", value: "fz" },
      { label: "Canter (Carga Pesada)", value: "canter-carga-pesada" }
    ]
  },
  {
    label: "Hyundai",
    value: "hyundai",
    models: [
      { label: "Xcient", value: "xcient" },
      { label: "Pavise", value: "pavise" },
      { label: "Mighty", value: "mighty" }
    ]
  },
  {
    label: "Sinotruk",
    value: "sinotruk",
    models: [
      { label: "Sitrak C7H", value: "sitrak-c7h" },
      { label: "Howo T7H", value: "howo-t7h" },
      { label: "Howo A7", value: "howo-a7" },
      { label: "Howo V7G", value: "howo-v7g" }
    ]
  },
  {
    label: "Howo",
    value: "howo",
    models: [
      { label: "Howo A7", value: "howo-a7" },
      { label: "Howo T7H", value: "howo-t7h" },
      { label: "Howo TX", value: "howo-tx" },
      { label: "Howo NX", value: "howo-nx" }
    ]
  },
  {
    label: "Foton",
    value: "foton",
    models: [
      { label: "Auman EST", value: "auman-est" },
      { label: "Auman GTL", value: "auman-gtl" },
      { label: "Aumark S", value: "aumark-s" },
      { label: "Auman C", value: "auman-c" }
    ]
  },
  {
    label: "Shacman",
    value: "shacman",
    models: [
      { label: "X3000", value: "x3000" },
      { label: "F3000", value: "f3000" },
      { label: "H3000", value: "h3000" },
      { label: "X5000", value: "x5000" }
    ]
  },
  {
    label: "JAC Motors",
    value: "jac-motors",
    models: [
      { label: "K7", value: "k7" },
      { label: "Gallop", value: "gallop" },
      { label: "Serie N (Pesados)", value: "serie-n-pesados" }
    ]
  },
  {
    label: "Dongfeng",
    value: "dongfeng",
    models: [
      { label: "Tianlong KX", value: "tianlong-kx" },
      { label: "Tianlong KL", value: "tianlong-kl" },
      { label: "D310", value: "d310" },
      { label: "D9", value: "d9" }
    ]
  },
  {
    label: "FAW",
    value: "faw",
    models: [
      { label: "J6P", value: "j6p" },
      { label: "JH6", value: "jh6" },
      { label: "J6M", value: "j6m" },
      { label: "J5M", value: "j5m" }
    ]
  }
];

export const marcas = marcasModelosVehiculos.map(({ models: _, ...marca }) => marca);

export const getModelsByMarca = (marcaValue: string): model[] => {
  return marcasModelosVehiculos.find((marca) => marca.value === marcaValue)?.models ?? [];
};