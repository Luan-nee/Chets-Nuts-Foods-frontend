// interface MapProps {
//   latitud: string;
//   longitud: string;
// }

export default function Map() {
  return (
    // <div className="w-full h-full flex items-center justify-center">
    //   <iframe
    //     src={`https://maps.geoapify.com/v1/tile/osm-bright/${100}/${x}/${y}.png`}
    //     width="600"
    //     height="450"
    //     style={{ border: 0 }}
    //     allowFullScreen
    //     loading="lazy"
    //     referrerPolicy="no-referrer-when-downgrade"
    //   ></iframe>
    // </div>
    <canvas className="maplibregl-canvas" tabIndex={0} aria-label="Map" role="region" width="1063" height="500" style={{width: '851px', height: '400px'}}></canvas>
  );
}
