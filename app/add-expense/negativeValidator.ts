import { PropertyValidator } from "nativescript-ui-dataform";

// >> angular-dataform-custom-validator
export class NegativeValidator extends PropertyValidator {
    constructor() {
        super();
        this.errorMessage = "Number must be positive";
    }

    public validate(value: number, propertyName: string): boolean {
        return value > 0;
    }
}
// << angular-dataform-custom-validator