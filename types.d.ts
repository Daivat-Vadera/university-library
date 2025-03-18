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
  hideBook: boolean;
  createdAt: Date;
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

interface QueryParams {
  query?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

interface PageProps {
  searchParams: Promise<{
    query?: string;
    sort?: string;
    page?: number;
  }>;
  params: Promise<{ id: string }>;
}


interface User {
  id: string;
  createdAt: Date | null;
  fullName: string;
  email: string;
  universityId: number;
  password: string;
  universityCard: string;
  status: "APPROVED" | "PENDING" | "REJECTED" | null;
  role: "USER" | "ADMIN" | null;
  lastActivityDate: string | null;
}