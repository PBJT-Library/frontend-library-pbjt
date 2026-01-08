// Books data - aligned with backend-perpus
export interface Book {
    id: string;        // UUID auto-generated (internal)
    uuid: string;      // Custom ID: BK001, BK002, etc.
    title: string;
    category: string;  // Direct string, not UUID
    author: string;
    publisher: string;
    year: number;
    stock: number;
}

export const mockBooks: Book[] = [
    {
        id: '1',
        uuid: 'BK001',
        title: 'Clean Code',
        category: 'Programming',
        author: 'Robert C. Martin',
        publisher: 'Prentice Hall',
        year: 2008,
        stock: 5,
    },
    {
        id: '2',
        uuid: 'BK002',
        title: 'The Pragmatic Programmer',
        category: 'Programming',
        author: 'Andrew Hunt, David Thomas',
        publisher: 'Addison-Wesley',
        year: 1999,
        stock: 4,
    },
    {
        id: '3',
        uuid: 'BK003',
        title: 'Design Patterns',
        category: 'Software Engineering',
        author: 'Gang of Four',
        publisher: 'Addison-Wesley',
        year: 1994,
        stock: 3,
    },
    {
        id: '4',
        uuid: 'BK004',
        title: 'Introduction to Algorithms',
        category: 'Computer Science',
        author: 'Thomas H. Cormen',
        publisher: 'MIT Press',
        year: 2009,
        stock: 6,
    },
    {
        id: '5',
        uuid: 'BK005',
        title: 'JavaScript: The Good Parts',
        category: 'Web Development',
        author: 'Douglas Crockford',
        publisher: "O'Reilly Media",
        year: 2008,
        stock: 5,
    },
    {
        id: '6',
        uuid: 'BK006',
        title: "You Don't Know JS",
        category: 'Web Development',
        author: 'Kyle Simpson',
        publisher: "O'Reilly Media",
        year: 2014,
        stock: 4,
    },
    {
        id: '7',
        uuid: 'BK007',
        title: 'Database System Concepts',
        category: 'Database',
        author: 'Abraham Silberschatz',
        publisher: 'McGraw-Hill',
        year: 2010,
        stock: 3,
    },
    {
        id: '8',
        uuid: 'BK008',
        title: 'Refactoring',
        category: 'Software Engineering',
        author: 'Martin Fowler',
        publisher: 'Addison-Wesley',
        year: 1999,
        stock: 4,
    },
];
