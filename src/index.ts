// This is going to be a pharmacy application
// Currently, I am just playing around with the idea of this application
// I want to be able to create the data structures and some basic logic for the app
// I want to be able to create a basic CRUD application
// I want classes for: Prescription, Pharmacy, Medicine, Patient, Inventory
// Methods:
// addPrescription, addMedicine, addPatient, addPharmacy
// updatePrescription, updateMedicine, updatePatient, updatePharmacy
// authPharmacy, authPrescription, authMedicine, authPatient,
// dispenseMedicine, patientCollectionOfMedicine
// markMedicineAsDispensed, markMedicineAsCollected, markMedicineAsCompleted
// markPrescriptionAsDispensed, markPrescriptionAsCollected, markPresriptionAsCompleted

// Data Structures:

interface Allergies {
    allergies: string | string[]
}
  
  interface DiagnosedMedicalConditions {
    conditions: string | string[]
  }
  
  interface MedicalHistory {
    hasAllergies: boolean,
    allergies: Allergies,
    diagnosedConditions: DiagnosedMedicalConditions
  }
  
  interface PrescriptionHistory {
    acuteMedicines: string | string[],
    repeatMedicines: string | string[],
    discontinuedMedicines: string | string[]
  }
  
  interface AuthorisedMedicines {
    acuteMedicines: string | string[],
    repeatMedicines: string | string[]
  }

  interface Address {
    nameOrNumber: string | number,
    street: string,
    town: string,
    city: string,
    postCode: string,
    country: string
  }

  interface ContactDetails {
    address: Address,
    phone: string | number,
    email: string,
    website: string | string[]
  }
  
  // Patient:
  /**
   * 1. Patient ID
   * 2. Name
   * 3. Address
   * 4. Phone Number
   * 5. Email
   * 6. Date of Birth
   * 7. Gender
   * 8. Allergies
   * 9. Medical History
   * 10. Prescription History
   * 11. Prescribed/ Authorised Medicines
   * 12. Nominated Pharmacy
   */
  
  interface PatientInterface {
    id: number,
    name: string,
    contactDetails: ContactDetails,
    dateOfBirth: Date,
    gender: string,
    allergies: Allergies["allergies"],
    medicalHistory: MedicalHistory,
    prescriptionHistory: PrescriptionHistory,
    authorisedMedicines: AuthorisedMedicines,
    nominatedPharmacy: string
  }

  class Patient {
    id: PatientInterface["id"];
    name: PatientInterface['name'];
    contactDetails: ContactDetails;
    dateOfBirth: PatientInterface['dateOfBirth'];
    gender: PatientInterface['gender'];
    allergies: Allergies['allergies'];
    medicalHistory: MedicalHistory;
    prescriptionHistory: PrescriptionHistory;
    authorisedMedicines: AuthorisedMedicines;
    nominatedPharmacy: string;


    constructor(
        id: Patient['id'], 
        name: Patient['name'], 
        contactDetails: Patient['contactDetails'], 
        dateOfBirth: Patient['dateOfBirth'], 
        gender: Patient['gender'], 
        allergies: Patient['allergies'],
        medicalHistory: Patient['medicalHistory'],
        prescriptionHistory: Patient['prescriptionHistory'],
        authorisedMedicines: Patient['authorisedMedicines'],
        nominatedPharmacy: Patient['nominatedPharmacy']
    ) {
        this.id = id;
        this.name = name;
        this.contactDetails = contactDetails;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.allergies = allergies;
        this.medicalHistory = medicalHistory;
        this.prescriptionHistory = prescriptionHistory;
        this.authorisedMedicines = authorisedMedicines;
        this.nominatedPharmacy = nominatedPharmacy;
    }
  }
  
  // Medicine:
  /**
   * 1. Medicine ID
   * 2. Name
   * 3. Description
   * 4. Price
   * 5. Quantity in inventory
   * 6. inStock
   * 7. Date of Manufacture
   * 8. Date of Expiry
   * 9. hasExpired
   * 10. Classification: CD/POM/GSL/etc
   */
  
  enum MedicineClassification {
    CD = "Controlled Drug",
    POM = "Prescription Only Medicine",
    P = "Pharmacy Only Medicine",
    GSL = "General Sales League"
  }
  
  interface MedicineInterface {
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
  
  class Medicine implements MedicineInterface {
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
  // Inventory:
  /**
   * 1. ItemID
   * 2. Name
   * 3. Description
   * 4. Quantity
   * 5. bool: lowStockLevel // to trigger automated reordering
  */
  
  interface InventoryInterface {
    medicine: Medicine,
    medicineID: Medicine["id"],
    medicineName: Medicine["name"],
    medicineDescription: Medicine["description"],
    quantity: Medicine["quantityHeldInInventory"],
    inStock: Medicine["inStock"]
  }

  class Inventory {
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
        const lowStockStatement: string = "ATTENTION: Some medicine stocks are low. Consider reordering.";
        const lowStockMedicinesFormattedOutputMap = lowStockMedicines.map((medicine, index) => `${index + 1}. ${medicine.name}: ${medicine.quantityHeldInInventory}`).join("\n");
        const lowStockMedicinesStatement: string = `Low-stock medicines:\n${lowStockMedicinesFormattedOutputMap}`;

        console.log(lowStockStatement);
        console.log(lowStockMedicinesStatement);

        // return; // if i return here, this will skip displaying any medicines with a stock count > 10, thereby only returning the medicines with a low stock (between 1 and 10)

        // return lowStockMedicinesStatement;
      }

      const formattedOutput = inStockMedicines.map((medicine, index) => `${index + 1}. ${medicine.name}: ${medicine.quantityHeldInInventory}`).join("\n");
      const stockStatement: string = `Medicines in stock:\n${formattedOutput}`;
      
      console.log(stockStatement);
      // return inStockStamenent (return as a string);
      // return inStockMedicines.length > 0 ? inStockMedicines : "No medicines in stock.";
    }
  }
  
  // Prescription:
  /**
   * 1. Prescription ID
   * 2. Patient ID
   * 3. Medicine ID
   * 4. Date of Prescription
   * 5. Date of Dispensing
   * 6. Date of Collection
   * 7. Date of Completed
   */
interface PrescriptionInterface {
    patient: Patient,
    medicine: Medicine,
    id: number,
    patientID: Patient["id"],
    medicineID: Medicine["id"],
    prescriptionStartDate: Date,
    prescriptionReviewDate: Date,
    dispensedDate: Date,
    collectionDate: Date,
    completionDate: Date
}

class Prescription {
    id: number;
    patientID: number;
    medicineID: number;
    prescriptionStartDate: Date;
    prescriptionReviewDate: Date;
    dispensedDate: Date | null;
    collectionDate: Date | null;
    completionDate: Date | null;

    constructor(prescription: PrescriptionInterface) {
        this.id = prescription.id;
        this.patientID = prescription.patientID;
        this.medicineID = prescription.medicineID;
        this.prescriptionStartDate = prescription.prescriptionStartDate;
        this.prescriptionReviewDate = prescription.prescriptionReviewDate;
        this.dispensedDate = prescription.dispensedDate || null;
        this.collectionDate = prescription.collectionDate || null;
        this.completionDate = prescription.completionDate || null;
    }
}


  
  // Pharmacy:
  /**
   * 1. Pharmacy ID
   * 2. Name
   * 3. Address
   * 4. Phone Number
   * 5. Email
   * 6. Website
   * 7. Opening Hours
   * 8. Closing Hours
   * 9. Inventory
   * 10. Prescriptions
   * 11. Medicines
   * 12. Patients
   */
  
  interface OperatingTimes {
    open: Date | number,
    close: Date | number
  }


  
  interface PharmacyInterface {
    id: number,
    name: string,
    contactDetails: ContactDetails,
    operatingTimes: OperatingTimes,
    inventory: Inventory,
    prescriptions: Prescription[],
    medicines: Medicine[],
    patients: Patient[]
  }

  class Pharmacy {
    id: number;
    name: string;
    contactDetails: ContactDetails;
    operatingTimes: OperatingTimes;
    inventory: Inventory;
    prescriptions: Prescription[];
    medicines: Medicine[];
    patients: Patient[];


    constructor(pharmacy: PharmacyInterface) {
        this.id = pharmacy.id;
        this.name = pharmacy.name;
        this.contactDetails = pharmacy.contactDetails;
        this.operatingTimes = pharmacy.operatingTimes;
        this.inventory = pharmacy.inventory;
        this.prescriptions = pharmacy.prescriptions || [];
        this.medicines = pharmacy.medicines || [];
        this.patients = pharmacy.patients || [];
    }
  }

const newPatient = new Patient(
    7370382293,
    "FASTPHARMACY",
    {
      address: {
        nameOrNumber: "Fast Pharmacy",
        street: "Fast Avenue",
        town: "Fast Town",
        city: "Fast Countuy",
        postCode: "FAST FST",
        country: "UK",
      },
      phone: "07396485930",
      email: "hello@fastpharmacy.net",
      website: ["fastpharmacy.net"],
    },
    new Date("1990-01-01"), // Example DOB
    "not disclosed",
    "Aspirin",
    {
      hasAllergies: true,
      allergies: { allergies: "Aspirin" },
      diagnosedConditions: { conditions: [] },
    },
    {
      acuteMedicines: ["Co-Amoxiclav"],
      repeatMedicines: ["Paracetamol", "Ibuprofen", "Omeprazole"],
      discontinuedMedicines: [],
    },
    {
      acuteMedicines: ["Co-Amoxiclav"],
      repeatMedicines: ["Paracetamol", "Ibuprofen", "Omeprazole"],
    },
    "Fast Pharmacy"
  );
  

const paracetamol = new Medicine({
  id: 101,
  name: "Paracetamol",
  description: "Analgesic",
  price: 1.99,
  quantityHeldInInventory: 0,
  inStock: true,
  manufactureDate: new Date("2024-01-01"),
  expiryDate: new Date("2026-01-01"),
  classification: MedicineClassification.GSL
});

const ibuprofen = new Medicine({
  id: 102,
  name: "Ibuprofen",
  description: "Anti-inflammatory",
  price: 0.99,
  quantityHeldInInventory: 0,
  inStock: true,
  manufactureDate: new Date("2024-01-01"),
  expiryDate: new Date("2026-01-01"),
  classification: MedicineClassification.GSL
});

const gabapentin = new Medicine({
  id: 103,
  name: "Gabapentin",
  description: "Gabapentinoid",
  price: 6.99,
  quantityHeldInInventory: 0,
  inStock: true,
  manufactureDate: new Date("2024-01-01"),
  expiryDate: new Date("2026-01-01"),
  classification: MedicineClassification.POM
});

const elvanse = new Medicine({
  id: 104,
  name: "Elvanse",
  description: "ADHD Pills",
  price: 10.99,
  quantityHeldInInventory: 1,
  inStock: true,
  manufactureDate: new Date("2024-01-01"),
  expiryDate: new Date("2026-01-01"),
  classification: MedicineClassification.CD
});

const newPrescription = new Prescription({
  id: 1,
  patient: newPatient,
  medicine: paracetamol,
  patientID: newPatient.id,
  medicineID: paracetamol.id,
  prescriptionStartDate: new Date("2025-01-23"),
  prescriptionReviewDate: new Date("2025-07-23"),
  dispensedDate: new Date("2025-01-27"),
  collectionDate: new Date("2025-01-28"),
  completionDate: new Date("2025-01-28")
});

const inventory = new Inventory();

// console.log(newPatient);
// console.log(paracetamol);
// console.log(newPrescription);

// paracetamol.isMedicineInStock();

inventory.addMedicine(paracetamol);
inventory.addMedicine(ibuprofen);
inventory.addMedicine(gabapentin);
inventory.addMedicine(elvanse);

inventory.getMedicinesInStock();