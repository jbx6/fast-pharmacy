import { Patient } from "./Patient";
import { Medicine } from "./Medicine";

export interface PrescriptionInterface {
    patient: Patient,
    medicines: Medicine[],
    id: number,
    patientID: Patient["id"],
    medicineIDs: Medicine["id"][],
    prescriptionStartDate: Date,
    prescriptionReviewDate: Date,
    dispensedDate: Date,
    collectionDate: Date,
    completionDate: Date
}

export class Prescription {
    id: number;
    patientID: number;
    medicines: Medicine[];
    medicineIDs: number[];
    prescriptionStartDate: Date;
    prescriptionReviewDate: Date;
    dispensedDate: Date | null;
    collectionDate: Date | null;
    completionDate: Date | null;

    constructor(prescription: PrescriptionInterface) {
        this.id = prescription.id;
        this.patientID = prescription.patientID;
        this.medicines = prescription.medicines;
        this.medicineIDs = prescription.medicineIDs;
        this.prescriptionStartDate = prescription.prescriptionStartDate;
        this.prescriptionReviewDate = prescription.prescriptionReviewDate;
        this.dispensedDate = prescription.dispensedDate || null;
        this.collectionDate = prescription.collectionDate || null;
        this.completionDate = prescription.completionDate || null;
    }
}