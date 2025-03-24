"use client";
import BookReceipt from "@/components/admin/receipt/BookReceipt";
import { PDFViewer } from "@react-pdf/renderer";
import { useState } from "react";

const page = () => {
  const [receiptData, setReceiptData] = useState({
    receiptId: "#12345",
    dateIssued: new Date().toLocaleDateString(),
    bookTitle: "Sample Book Title",
    bookAuthor: "Sample Author",
    bookGenre: "Fiction",
    borrowDate: new Date().toLocaleDateString(),
    dueDate: new Date(
      Date.now() + 14 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    duration: "14 Days",
  });
  return (
    <div className="w-full h-[800px] border border-gray-300 rounded-lg overflow-hidden">
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <BookReceipt {...receiptData} />
      </PDFViewer>
    </div>
  );
};

export default page;
