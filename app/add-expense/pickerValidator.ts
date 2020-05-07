import { PropertyValidator } from "nativescript-ui-dataform";

// >> angular-dataform-custom-validator
export class PickerValidator extends PropertyValidator {
    constructor() {
        super();
        this.errorMessage = "Please select a category";
    }

    public validate(value: any, propertyName: string): boolean {
        return value !== "Select Category";
    }
}
// << angular-dataform-custom-validator