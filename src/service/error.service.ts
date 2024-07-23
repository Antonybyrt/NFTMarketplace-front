import Swal from 'sweetalert2'


export class ErrorService {

    static successMessage = (title: string, msg: string) => {
        return Swal.fire({
            title: title,
            text: msg,
            icon: "success"
          });
    }

    static errorMessage = (title: string, msg: string) => {
        return Swal.fire({
            title: title,
            text: msg,
            icon: "error"
        });
    }

    static async promptPrice(title: string, placeholder: string): Promise<string | null> {
        const { value: price } = await Swal.fire({
          title: title,
          input: 'text',
          inputPlaceholder: placeholder,
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return 'You need to enter a price!';
            }
          },
        });
    
        return price;
      }

}