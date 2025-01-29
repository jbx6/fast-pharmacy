import { ContactDetails, Allergies, MedicalHistory, PrescriptionHistory, AuthorisedMedicines } from "./app";
import { PrescriptionInterface } from "./Prescription";

export interface PatientInterface {
    id: number,
    name: string,
    contactDetails: ContactDetails,
    dateOfBirth: Date,
    gender: string,
    allergies: Allergies["allergies"],
    medicalHistory: MedicalHistory,
    prescriptionHistory: PrescriptionHistory,
    authorisedMedicines: AuthorisedMedicines,
    nominatedPharmacy: string,
    prescriptions: PrescriptionInterface
  }

export class Patient {
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