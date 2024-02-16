import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="w-96">
        <Link href="/users">
          <button 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center" 
            type="button">
              User List
            </button>
        </Link>
      </div>
    </main>
  );
}
