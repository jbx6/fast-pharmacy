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
  
  interface Medicine {
    id: number,
    name: string,
    description: string,
    price: number,
    quantityHeldInInventory: number,
    inStock: boolean,
    manufactureDate: Date,
    expiryDate: Date,
    hasExpired: boolean,
    classification: MedicineClassification
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
        const newMedicine = { ...existingMedicine, ...updatedMedicine };
        
        this.medicines.set(id, newMedicine);
    }

    getMedicine(id: number): Medicine | undefined {
        return this.medicines.get(id);
    }

    deleteMedicine(id: number): void {
        this.medicines.delete(id);
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
  
console.log(newPatient);