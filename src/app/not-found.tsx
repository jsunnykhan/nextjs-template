import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-extrabold text-gray-300 tracking-widest">
          404
        </h1>
        <h2 className="mt-2 text-3xl font-bold text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-4 text-gray-500">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-800 transition"
          >
            Go Home
          </Link>
        </div>
      </div>

      <div className="absolute bottom-4 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Sunny khan. All rights reserved.
      </div>
    </div>
  );
}
