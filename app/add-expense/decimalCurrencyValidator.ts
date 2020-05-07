import { PropertyValidator } from "nativescript-ui-dataform";

// >> angular-dataform-custom-validator
export class DecimalCurrencyValidator extends PropertyValidator {
    constructor() {
        super();
        this.errorMessage = "Number must only have 2 decimal places";
    }

    public validate(value: number, propertyName: string): boolean {
        let valString = value.toString().split(".")
        let valDecimal = 0
        if (valString.length > 1) {
            valDecimal = valString[1].length
        }
        return valDecimal<=2;
    }
}
// << angular-dataform-custom-validator