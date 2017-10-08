import { FormControl } from '@angular/forms';

export class EmailValidator {
    static isValid(control: FormControl): any {

        // [a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$

        if (!control.value) {
            return {
                "email empty": true
            };
        }

        if (!control.value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/g)) {
            return {
                "invalid email": true
            };
        }

        return null;
    }
}