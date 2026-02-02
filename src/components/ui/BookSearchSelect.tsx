import React, { useState, useMemo, useCallback } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Book {
    id: number;
    book_id: string;
    title: string;
    author: string | null;
    uuid?: string;
    status?: string;
}

interface BookSearchSelectProps {
    books: Book[];
    value: number | '';
    onChange: (bookId: number) => void;
    label?: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
}

export const BookSearchSelect: React.FC<BookSearchSelectProps> = ({
    books,
    value,
    onChange,
    label = 'Select Book',
    placeholder = 'Search books...',
    required = false,
    error,
}) => {
    const [query, setQuery] = useState('');

    // Memoize selected book to prevent re-computation
    const selectedBook = useMemo(() =>
        books.find(book => book.id === value) || null,
        [books, value]
    );

    // Filter books based on search query with memoization
    const filteredBooks = useMemo(() => {
        if (query === '') {
            return books;
        }

        const searchLower = query.toLowerCase();
        return books.filter(book => {
            const bookIdMatch = book.book_id.toLowerCase().includes(searchLower);
            const titleMatch = book.title.toLowerCase().includes(searchLower);
            const authorMatch = book.author?.toLowerCase().includes(searchLower);

            return bookIdMatch || titleMatch || authorMatch;
        });
    }, [books, query]);

    // Memoize change handler
    const handleChange = useCallback((book: Book | null) => {
        if (book) {
            onChange(book.id);
        }
    }, [onChange]);

    return (
        <div className="w-full">
            {/* Label */}
            {label && (
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </label>
            )}

            <Combobox value={selectedBook} onChange={handleChange}>
                <div className="relative">
                    {/* Input with icon */}
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500 pointer-events-none" />

                        <ComboboxInput
                            className={`
                                w-full rounded-lg border pl-10 pr-10 py-2.5
                                bg-white dark:bg-slate-800
                                text-slate-900 dark:text-slate-100
                                placeholder:text-slate-400 dark:placeholder:text-slate-500
                                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                                ${error ? 'border-error' : 'border-slate-300 dark:border-slate-600'}
                                transition-colors duration-200
                            `}
                            displayValue={(book: Book | null) =>
                                book ? `${book.book_id} - ${book.title}` : ''
                            }
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={placeholder}
                        />

                        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <ChevronUpDownIcon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                        </ComboboxButton>
                    </div>

                    {/* Options dropdown */}
                    <ComboboxOptions className="
                        absolute z-10 mt-2 w-full
                        bg-white dark:bg-slate-800
                        border border-slate-200 dark:border-slate-700
                        rounded-lg shadow-lg
                        max-h-60 overflow-auto
                        py-1
                        focus:outline-none
                    ">
                        {filteredBooks.length === 0 ? (
                            <div className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                                {query === '' ? 'No books available' : `No books found for "${query}"`}
                            </div>
                        ) : (
                            filteredBooks.map((book) => (
                                <ComboboxOption
                                    key={book.id}
                                    value={book}
                                    className={({ focus }) => `
                                        relative cursor-pointer select-none py-3 pl-10 pr-4
                                        ${focus ? 'bg-primary/10 dark:bg-primary/20' : ''}
                                        transition-colors duration-150
                                    `}
                                >
                                    {({ selected, focus }) => (
                                        <>
                                            <div className="flex flex-col">
                                                {/* Book ID */}
                                                <span className={`
                                                    font-mono text-xs font-medium
                                                    ${focus ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}
                                                `}>
                                                    {book.book_id}
                                                </span>

                                                {/* Title */}
                                                <span className={`
                                                    font-semibold mt-0.5
                                                    ${selected ? 'font-bold' : 'font-medium'}
                                                    ${focus ? 'text-slate-900 dark:text-slate-50' : 'text-slate-700 dark:text-slate-200'}
                                                `}>
                                                    {book.title}
                                                </span>

                                                {/* Author */}
                                                {book.author && (
                                                    <span className={`
                                                        text-sm mt-0.5
                                                        ${focus ? 'text-slate-600 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'}
                                                    `}>
                                                        {book.author}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Selected checkmark */}
                                            {selected && (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <CheckIcon className="h-5 w-5 text-primary" />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </ComboboxOption>
                            ))
                        )}
                    </ComboboxOptions>
                </div>
            </Combobox>

            {/* Error message */}
            {error && (
                <p className="mt-2 text-sm text-error">
                    {error}
                </p>
            )}

            {/* Helper text */}
            {!error && filteredBooks.length > 0 && query && (
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
                </p>
            )}
        </div>
    );
};
