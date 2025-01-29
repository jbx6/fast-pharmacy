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

// Imports
import { Medicine } from "./Medicine";
import { Prescription } from "./Prescription";
import { Patient } from "./Patient";
import { Inventory } from "./Inventory";

// Data Structures:

export interface Allergies {
    allergies: string | string[]
}
  
  export interface DiagnosedMedicalConditions {
    conditions: string | string[]
  }
  
  export interface MedicalHistory {
    hasAllergies: boolean,
    allergies: Allergies,
    diagnosedConditions: DiagnosedMedicalConditions
  }
  
  export interface PrescriptionHistory {
    acuteMedicines: string | string[],
    repeatMedicines: string | string[],
    discontinuedMedicines: string | string[]
  }
  
  export interface AuthorisedMedicines {
    acuteMedicines: string | string[],
    repeatMedicines: string | string[]
  }

  export interface Address {
    nameOrNumber: string | number,
    street: string,
    town: string,
    city: string,
    postCode: string,
    country: string
  }

  export interface ContactDetails {
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
  
  // Inventory:
  /**
   * 1. ItemID
   * 2. Name
   * 3. Description
   * 4. Quantity
   * 5. bool: lowStockLevel // to trigger automated reordering
  */
  
  
  
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
  
  export interface OperatingTimes {
    open: Date | number,
    close: Date | number
  }


  
  export interface PharmacyInterface {
    id: number,
    name: string,
    contactDetails: ContactDetails,
    operatingTimes: OperatingTimes,
    inventory: Inventory,
    prescriptions: Prescription[],
    medicines: Medicine[],
    patients: Patient[]
  }

  export class Pharmacy {
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