export type MyBook = {
    userId: number;
    bookId: number;
    ISBN: string;
    title: string;
    author: string;
    publisher: string;
    categoryId: number;
    categoryName: string;
    stateId: number;
    stateName: string;
    favorite: boolean;
    registerDate: Date;
    image?: string | string[];
};