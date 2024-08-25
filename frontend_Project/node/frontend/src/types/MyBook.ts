export type MyBook = {
    userId: Number;
    bookId: Number;
    ISBN: String;
    title: string;
    author: string;
    publisher: string;
    categoryId: Number;
    categoryName: string;
    stateId: Number;
    stateName: String;
    favorite: Boolean;
    registerDate: Date;
    image?: string | string[];
};