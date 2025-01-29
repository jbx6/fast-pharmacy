import { Inventory } from "./Inventory";
import medicines from "./medicines";
import { Medicine } from "./Medicine";
import { Prescription } from "./Prescription";
import { newPatient } from "./patients";
import { newPrescription } from "./prescriptions";

async function main(pharmacyName: string, medicines: { paracetamol: Medicine, ibuprofen: Medicine, gabapentin: Medicine, elvanse: Medicine }) {
  console.log("Welcome to Fast Pharmacy!");

  console.log(`Creating a new inventory for ${pharmacyName}...`);
  const inventory = new Inventory();
  console.log("New inventory created! Adding medicines...")

  inventory.addMedicine(medicines.paracetamol);
  inventory.addMedicine(medicines.ibuprofen);
  inventory.addMedicine(medicines.gabapentin);
  inventory.addMedicine(medicines.elvanse);

  inventory.getMedicinesInStock();

  // init new patient
  // init prescription for said patient
  // init pharmacymanager to perform actions on above, such as dispensing, completion, stock-check errors (if req. medicine !inStock), etc
}

main("Fast Pharmacy", medicines);

/** TO-DO
 * 1. New patients;
 * 2. New prescriptions;
 * 3. PharmacyManager so this app can do stuff
 */