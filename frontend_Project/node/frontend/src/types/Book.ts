export type Book = {
    id: number;
    ISBN: string;
    title: string;
    author: string;
    publisher: string;
    categoryId: Number;
    categoryName: string;
    image?: string | string[]
};