export enum MedicineClassification {
    CD = "Controlled Drug",
    POM = "Prescription Only Medicine",
    P = "Pharmacy Only Medicine",
    GSL = "General Sales League"
  }
  
export interface MedicineInterface {
    id: number,
    name: string,
    description: string,
    price: number,
    quantityHeldInInventory: number,
    inStock: boolean,
    manufactureDate: Date,
    expiryDate: Date,
    classification: MedicineClassification
  }

export class Medicine implements MedicineInterface {
    id: number;
    name: string;
    description: string;
    price: number;
    quantityHeldInInventory: number;
    inStock: boolean;
    manufactureDate: Date;
    expiryDate: Date;
    classification: MedicineClassification;

    constructor(medicine: MedicineInterface) {
      this.id = medicine.id;
      this.name = medicine.name;
      this.description = medicine.description;
      this.price = medicine.price;
      this.quantityHeldInInventory = medicine.quantityHeldInInventory;
      this.inStock = medicine.inStock;
      this.manufactureDate = medicine.manufactureDate;
      this.expiryDate = medicine.expiryDate;
      this.classification = medicine.classification;
    }

    // Method to check if medicine is in stock
    isMedicineInStock(): boolean | string | void {
      const currentQuantityHeldInInventory: number = this.quantityHeldInInventory;
      const outOfStock: number = 0;

      const stockCheck: boolean = currentQuantityHeldInInventory > outOfStock;

      if (!stockCheck) {
        console.log(`Medicine "${this.name}" is out of stock.\n ¬ Number held in stock: ${this.quantityHeldInInventory}.\n ¬ Reorder recommended!`);
        this.inStock = stockCheck;
        console.log(`inStock: ${this.inStock}.`)
        return;
        // return `Medicine ${this.name} Out of Stock`;
      }
      
      console.log(`Medicine ${this.name} is in stock.\n ¬ Number held in stock: ${this.quantityHeldInInventory}.`);
      // return `Medicine ${this.name} is in stock. Stock count: ${this.quantityHeldInInventory}`;

      // return currentQuantityHeldInInventory > outOfStock;
    }

    // Method to check if medicine has expired
    hasExpired(): boolean {
      const today = new Date();

      return today > this.expiryDate;
    }
  }