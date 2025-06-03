import Link from "next/link";
import "./globals.css";
import { SearchBar } from "@/components/SearchBar";
import { SearchProvider } from "@/contexts/SearchContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <SearchProvider>
                    <nav className="bg-gray-800 p-4">
                        <div className="container mx-auto flex justify-between">
                            <Link
                                href="/"
                                className="text-white text-lg font-bold"
                            >
                                E-Commerce
                            </Link>
                            <div>
                                <Link href="/" className="text-white mr-4">
                                    Home
                                </Link>
                                <Link
                                    href="/create"
                                    className="mb-6 inline-block bg-accent text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
                                >
                                    Add Product
                                </Link>
                            </div>
                            <SearchBar />
                        </div>
                    </nav>
                    <main className="container mx-auto p-4">{children}</main>
                </SearchProvider>
            </body>
        </html>
    );
}
