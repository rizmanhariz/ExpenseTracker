export class Expense {
    public expenseName: string;
    public expenseDate: Date;
    public expenseCategory: string;
    public expenseVal: number; 
    public expenseRemark: string;

    constructor(
        expenseName: string,
        expenseCategory: string,
        expenseDate: Date,
        expenseVal: number,
        expenseRemark: string
    ){
        this.expenseName = expenseName;
        this.expenseCategory = expenseCategory;
        this.expenseDate = expenseDate;
        this.expenseVal = expenseVal;
        this.expenseRemark = expenseRemark;
        // this.expenseName = null
        // this.expenseCategory = null;
        // this.expenseDate = expenseDate;
        // this.expenseVal = null;
        // this.expenseRemark = null;
    }

}

export class Categories {
    public categoryName: string;
    public categoryMaxVal: number;
    public categoryRemark: string;
    public categoryIMG: string;
    
    constructor(
        categoryName: string,
        categoryMaxVal: number,
        categoryRemark: string,
        categoryIMG: string
    ) {
        this.categoryName = categoryName;
        this.categoryMaxVal = categoryMaxVal;
        this.categoryRemark = categoryRemark;
        this.categoryIMG = categoryIMG
    }
}