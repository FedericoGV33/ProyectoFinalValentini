// src/services/productsService.js
import { db } from "../firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export async function getProducts(categoryId) {
  const colRef = collection(db, "products");

  const q = categoryId
    ? query(colRef, where("category", "==", categoryId))
    : colRef;

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProductById(itemId) {
  const docRef = doc(db, "products", itemId);
  const snap = await getDoc(docRef);

  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}
