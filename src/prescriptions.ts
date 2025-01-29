import { Prescription } from "./Prescription";
import medicines from "./medicines";
import { newPatient } from "./patients";

const { paracetamol, ibuprofen, gabapentin, elvanse } = medicines;


export const newPrescription = new Prescription({
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