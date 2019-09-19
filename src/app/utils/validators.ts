import { AbstractControl } from '@angular/forms';

export const confirmPassword = (control: AbstractControl) => {
    
    if (control.value == control.root.value['password']) {
        return { confirmed: true };
    } else {
        return { confirmed: false };
    }
};
