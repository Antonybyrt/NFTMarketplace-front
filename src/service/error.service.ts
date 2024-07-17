import Swal from 'sweetalert2'


export class ErrorService {

    successMessage = (title: string, msg: string) => {
        return Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
          });
    }

}