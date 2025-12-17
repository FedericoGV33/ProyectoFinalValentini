// src/components/ItemListContainer.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import { getProducts } from "../services/productsService";

export default function ItemListContainer({ greeting }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      try {
        const data = await getProducts(categoryId);
        if (alive) setItems(data);
      } catch (e) {
        console.error("Error al cargar productos (Firestore)", e);
        if (alive) setItems([]);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [categoryId]);

  return (
    <section className="container py-4 px-3">
      <h1 className="h3 mb-2">{greeting}</h1>

      {categoryId && (
        <p className="text-secondary mb-3">
          Selected category: <strong>{categoryId}</strong>
        </p>
      )}

      {loading ? (
        <p>Loading products...</p>
      ) : items.length === 0 ? (
        <p>No products found for this category.</p>
      ) : (
        <ItemList products={items} />
      )}
    </section>
  );
}
