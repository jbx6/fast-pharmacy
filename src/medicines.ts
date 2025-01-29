import { Medicine, MedicineClassification } from "./Medicine";

const paracetamol = new Medicine({
    id: 101,
    name: "Paracetamol",
    description: "Analgesic",
    price: 1.99,
    quantityHeldInInventory: 10,
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
    quantityHeldInInventory: 10,
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
    quantityHeldInInventory: 10,
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
    quantityHeldInInventory: 11,
    inStock: true,
    manufactureDate: new Date("2024-01-01"),
    expiryDate: new Date("2026-01-01"),
    classification: MedicineClassification.CD
  });

const medicines = { paracetamol, ibuprofen, gabapentin, elvanse }

export default medicines;