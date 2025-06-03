"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function EditProduct() {
    const { id } = useParams();
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
    });

    const [newImage, setNewImage] = useState<File | null>(null);

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then((res) => res.json())
            .then((data) =>
                setForm({
                    name: data.name,
                    description: data.description,
                    price: data.price.toString(),
                    image: data.image || "",
                })
            );
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let imageUrl = form.image;

            if (newImage) {
                const formData = new FormData();
                formData.append("image", newImage);

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!uploadRes.ok) throw new Error("Upload failed");

                const data = await uploadRes.json();
                imageUrl = data.url;
            }

            await fetch(`/api/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    price: parseFloat(form.price),
                    image: imageUrl,
                }),
            });

            router.push("/");
        } catch (err) {
            console.error("Error updating product:", err);
            alert("Có lỗi xảy ra khi cập nhật.");
        }
    };

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4 max-w-md mx-auto"
            >
                <div>
                    <label className="block font-medium">Name</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        className="border p-2 w-full rounded"
                        rows={4}
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Price</label>
                    <input
                        type="number"
                        value={form.price}
                        onChange={(e) =>
                            setForm({ ...form, price: e.target.value })
                        }
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Current Image</label>
                    {form.image && (
                        <Image
                            width={640}
                            height={640}
                            src={form.image}
                            alt="Current"
                            className="w-32 h-32 object-cover rounded mb-2"
                        />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setNewImage(file);
                        }}
                        className="w-full"
                    />
                    <small className="text-gray-500">
                        Để trống nếu không thay đổi ảnh
                    </small>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 rounded font-medium text-white bg-green-600 hover:bg-green-700 transition"
                >
                    Cập nhật sản phẩm
                </button>
            </form>
        </div>
    );
}
