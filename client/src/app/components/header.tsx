import Link from 'next/link';
import React from 'react';

const Header = () => {
    return <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow-md">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <Link href="/" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Demo Publicis Sapient</span>
                </Link>
            </div>
        </nav>
    </header>

}

export default Header;