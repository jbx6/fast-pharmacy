import { Patient } from "./Patient";

export const newPatient = new Patient(
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

export default { newPatient };