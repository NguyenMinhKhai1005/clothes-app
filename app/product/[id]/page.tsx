"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
};

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            {product.image && (
                <Image
                    width={640}
                    height={640}
                    src={product.image}
                    alt={product.name}
                    className="w-64 h-64 object-cover mb-4"
                />
            )}
            <p>{product.description}</p>
            <p className="text-lg font-bold">${product.price}</p>
        </div>
    );
}
