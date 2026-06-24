import { toast } from "sonner";
import type { ResponseCreateProducto } from "../../types/producto.type";
import { NotificationProduct,NotificacionMasterZ } from "../ui/NotificacionProduct";
import type { PropsNotificaciones } from "../../types/constantes.type";

export const NotificationProductDefect = (producto: ResponseCreateProducto) => {
  toast.custom((t) => <NotificationProduct producto={producto} t={t} />, {
    duration: 4000,
    position: "top-right",
    className: "w-full max-w-md !bg-transparent !shadow-none",
  });
};


export const NoticacionesMaster = ({descripcion,icon,titulo}:PropsNotificaciones)=>{
  toast.custom(
    (t) => (
      <NotificacionMasterZ
        descripcion={descripcion}
        icon={icon}
        t={t}
        titulo={titulo}
      />
    ),
    {
      duration: 4000,
      position: "top-right",
      className: "w-full max-w-md !bg-transparent !shadow-none",
    },
  );
}
