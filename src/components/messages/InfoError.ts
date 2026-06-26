import { toast } from 'sonner';
import Swal, { type SweetAlertIcon } from "sweetalert2";

export const InfoError = (title: string, message: string) => {
  toast.error(title, {
    description: message,
    style: {
      background: '#3f0200',
      color: '#ffffff',
      borderColor: '#c50f0f'
    },
  });
};

export const InfoErrorSwal = (status: SweetAlertIcon, mensaje: string) => {
  Swal.fire({
    title: mensaje,
    icon: status,
    position: "center",
    showConfirmButton: status !== "success",
    timer: 1500,
  })
};