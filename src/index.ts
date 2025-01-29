import { Inventory } from "./Inventory";
import { paracetamol, ibuprofen, gabapentin, elvanse } from "./medicines";
import { Medicine } from "./Medicine";

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
}

const medicines = { paracetamol, ibuprofen, gabapentin, elvanse };

main("Fast Pharmacy", medicines);