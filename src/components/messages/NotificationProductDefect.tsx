import { toast } from "sonner";
import type { ResponseCreateProducto } from "../../types/producto.type";
import { NotificationProduct } from "../ui/NotificacionProduct";

export const NotificationProductDefect = (producto: ResponseCreateProducto) => {
  toast.custom((t) => <NotificationProduct producto={producto} t={t} />, {
    duration: 4000,
    position: "top-right",
    className: "w-full max-w-md !bg-transparent !shadow-none",
  });
};
