import { Patient } from "./Patient";
import { Medicine } from "./Medicine";

export interface PrescriptionInterface {
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

export class Prescription {
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