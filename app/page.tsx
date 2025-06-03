"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
};

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("/api/products")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    console.error("Invalid API response format:", data);
                }
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            await fetch(`/api/products/${id}`, { method: "DELETE" });
            setProducts(products.filter((product) => product._id !== id));
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="border p-4 rounded shadow"
                    >
                        {product.image && (
                            <Image
                                width={640}
                                height={640}
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover mb-2"
                            />
                        )}
                        <h2 className="text-xl font-semibold">
                            {product.name}
                        </h2>
                        <p>{product.description}</p>
                        <p className="text-lg font-bold">${product.price}</p>
                        <div className="mt-2">
                            <Link
                                href={`/product/${product._id}`}
                                className="text-blue-500 mr-2"
                            >
                                View
                            </Link>
                            <Link
                                href={`/edit/${product._id}`}
                                className="text-green-500 mr-2"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(product._id)}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
