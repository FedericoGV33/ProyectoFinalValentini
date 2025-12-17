// src/components/ItemDetailContainer.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { getProductById } from "../services/productsService";

export default function ItemDetailContainer() {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      try {
        const data = await getProductById(itemId);
        if (alive) setProduct(data);
      } catch (e) {
        console.error("Error al cargar producto (Firestore)", e);
        if (alive) setProduct(null);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [itemId]);

  if (loading) {
    return (
      <section className="container py-4 px-3">
        <p>Loading product...</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="container py-4 px-3">
        <p>Product not found.</p>
      </section>
    );
  }

  return (
    <section className="container py-4 px-3">
      <ItemDetail product={product} />
    </section>
  );
}
