import { Medicine } from "./Medicine";

export interface InventoryInterface {
    medicine: Medicine,
    medicineID: Medicine["id"],
    medicineName: Medicine["name"],
    medicineDescription: Medicine["description"],
    quantity: Medicine["quantityHeldInInventory"],
    inStock: Medicine["inStock"]
}

export class Inventory {
    private medicines: Map<number, Medicine> = new Map();
    
    // methods
    addMedicine(medicine: Medicine): void {
        this.medicines.set(medicine.id, medicine);
    }

    updateMedicine(id: number, updatedMedicine: Partial<Medicine>): void {
        const existingMedicine = this.medicines.get(id);
        if (!existingMedicine) throw new Error("Medicine not found.");

        // const newMedicine = { ...existingMedicine, ...updatedMedicine };

        // Fix for the above issue caused by spread operator when merging objects
        // When merging objects with spread, the methods defined in a class are NOT 'carried over' because...
        // ...the spread operator only copies DATA PROPERTIES, not methods from the prototype
        const newMedicine = new Medicine({
          id: existingMedicine.id,
          name: updatedMedicine.name ?? existingMedicine.name,
          description: updatedMedicine.description ?? existingMedicine.description,
          price: updatedMedicine.price ?? existingMedicine.price,
          quantityHeldInInventory: updatedMedicine.quantityHeldInInventory ?? existingMedicine.quantityHeldInInventory,
          inStock: updatedMedicine.inStock ?? existingMedicine.inStock,
          manufactureDate: updatedMedicine.manufactureDate ?? existingMedicine.manufactureDate,
          expiryDate: updatedMedicine.expiryDate ?? existingMedicine.expiryDate,
          classification: updatedMedicine.classification ?? existingMedicine.classification
        })
        
        this.medicines.set(id, newMedicine);
    }

    getMedicine(id: number): Medicine | undefined {
        return this.medicines.get(id);
    }

    deleteMedicine(id: number): void {
        this.medicines.delete(id);
    }

    getMedicinesInStock(): Medicine[] | string | void {
      const medicinesArray = Array.from(this.medicines.values());
      const inStockMedicines = medicinesArray.filter(medicine => medicine.quantityHeldInInventory > 0);
      const outOfStockMedicines = medicinesArray.filter(medicine => medicine.quantityHeldInInventory < 1);
      const lowStockMedicines = medicinesArray.filter(medicine => medicine.quantityHeldInInventory >= 1 && medicine.quantityHeldInInventory <= 10);

      // const isStockLow: boolean = lowStockMedicines.filter(medicine => medicine.quantityHeldInInventory)

      if (inStockMedicines.length === 0) {
        const outOfStockStatement: string = "No medicines in stock.";

        const outOfStockMedicinesFormattedOutputMap = outOfStockMedicines.map((medicine, index) => `${index + 1}. ${medicine.name}: ${medicine.quantityHeldInInventory}`).join("\n");
        const outOfStockMedicinesStatement: string = `Medicines out of stock:\n${outOfStockMedicinesFormattedOutputMap}`;
        console.log(outOfStockStatement); // 'return' void (no return)
        console.log(outOfStockMedicinesStatement);

        return //outOfStockStatement (as a string)

      } 
      
      if (lowStockMedicines.length > 0) {
        const lowStockStatement: string = "ATTENTION: Some medicine stocks are low. Consider reordering:";
        const lowStockMedicinesFormattedOutputMap = lowStockMedicines.map((medicine, index) => `${index + 1}. ${medicine.name}: ${medicine.quantityHeldInInventory}`).join("\n");
        const lowStockMedicinesStatement: string = `Low-stock medicines:\n${lowStockMedicinesFormattedOutputMap}\n`;

        console.log(lowStockStatement);
        console.log(lowStockMedicinesStatement);

        // return; // if i return here, this will skip displaying any medicines with a stock count > 10, thereby only returning the medicines with a low stock (between 1 and 10)

        // return lowStockMedicinesStatement;
      }

      const formattedOutput = inStockMedicines.map((medicine, index) => `${index + 1}. ${medicine.name}: ${medicine.quantityHeldInInventory}`).join("\n");
      const stockStatement: string = `Medicines in stock:\n${formattedOutput}\n`;
      
      console.log(stockStatement);
      // return inStockStamenent (return as a string);
      // return inStockMedicines.length > 0 ? inStockMedicines : "No medicines in stock.";
    }
  }