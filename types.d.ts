interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  total_copies: number;
  available_copies: number;
  description: string;
  color: string;
  cover: string;
  video: string;
  summary: string;
  isLoanedBook?: boolean;
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
