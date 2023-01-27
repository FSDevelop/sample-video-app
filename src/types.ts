export interface Show {
    id: number;
    name: string;
    genres: string[];
    summary: string;
    image: {
        medium: string,
        original: string
    };
};
