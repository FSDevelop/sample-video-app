export interface Show {
    id: number;
    name: string;
    genres: string[];
    summary: string;
    image: {
        medium: string;
        original: string;
    };
    rating: {
        average: number;
    };
    premiered: Date;
    ended: Date;
};

export interface GlobalState {
    selectedShow: Show | null;
    shows: Show[];
};
