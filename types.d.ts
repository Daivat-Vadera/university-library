interface Book {
  id: string;
  bookTitle: string;
  author: string;
  genre: string;
  rating: number;
  totalNoOfBooks: number;
  availableCopies: number;
  description: string;
  bookPrimaryColor: string;
  bookImage: string;
  bookVideo: string;
  bookSummary: string;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  bookTitle: string;
  author: string;
  genre: string;
  rating: number;
  totalNoOfBooks: number;
  availableCopies: number;
  description: string;
  bookPrimaryColor: string;
  bookImage: string;
  bookVideo: string | null;
  bookSummary: string;
}

interface BorrowBookParams {
  userId: string;
  bookId: string;
}
