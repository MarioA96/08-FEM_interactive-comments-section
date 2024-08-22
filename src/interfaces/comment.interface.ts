export interface Comment {
    currentUser: User;
    ratings:     Ratings;
    comments:    CommentElement[];
}

export interface CommentElement {
    id:          string;
    content:     string;
    createdAt:   string;
    score:       number;
    user:        User;
    replies?:    CommentElement[];
    replyingTo?: string;
}

export interface User {
    image:    Image;
    username: string;
}

export interface Image {
    png:  string;
    webp: string;
}

export interface Ratings {
    ratedComments: RatedComment[];
}

export interface RatedComment {
    id:     string;
    rating: string;
}
