"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [image, setImage] = useState<File | null>(null);
    const [isCreating, setIsCreating] = useState(false); // 👈 trạng thái chờ
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true); // ✅ start pending

        try {
            let imageUrl = "";
            if (image) {
                const formData = new FormData();
                formData.append("image", image);

                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!res.ok) throw new Error("Image upload failed");

                const data = await res.json();
                imageUrl = data.url;
            }

            const product = {
                name,
                description,
                price,
                image: imageUrl,
            };

            const productRes = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product),
            });

            if (!productRes.ok) throw new Error("Product creation failed");

            router.push("/");
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra khi tạo sản phẩm.");
        } finally {
            setIsCreating(false); // ✅ end pending
        }
    };

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold gradient-text mb-6">
                Add New Product
            </h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg"
            >
                <fieldset disabled={isCreating} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block font-medium mb-1"
                        >
                            Product Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block font-medium mb-1"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            required
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="price"
                            className="block font-medium mb-1"
                        >
                            Price
                        </label>
                        <input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) =>
                                setPrice(
                                    e.target.value ? Number(e.target.value) : ""
                                )
                            }
                            required
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="image"
                            className="block font-medium mb-1"
                        >
                            Upload Image
                        </label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setImage(file);
                            }}
                            className="w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full text-white py-2 rounded-lg font-medium transition ${
                            isCreating
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {isCreating
                            ? "Đang tạo sản phẩm..."
                            : "Tạo mới sản phẩm"}
                    </button>
                </fieldset>
            </form>
        </div>
    );
}
