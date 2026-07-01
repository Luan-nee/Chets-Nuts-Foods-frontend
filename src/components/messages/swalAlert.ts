import Swal, { type SweetAlertIcon } from "sweetalert2";

type SwalAlert = {
  status: SweetAlertIcon
  message: string
}

export default function swalAlert({
  status, 
  message
}: SwalAlert) {
  Swal.fire({
    title: message,
    icon: status,
    position: "center",
    showConfirmButton: status === "success" ? false : true,
    theme:"dark"
  }).then(() => {})
} 
