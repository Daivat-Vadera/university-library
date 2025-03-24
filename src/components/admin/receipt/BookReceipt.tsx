import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import BookWiseLightLogo from "../../../../public/images/BookWiseLightLogo.png";

Font.register({
  family: "IBM",
  fonts: [
    { src: "../../../fonts/IBMPlexSans-Regular.ttf", fontWeight: "normal" },
    {
      src: "../../../fonts/IBMPlexSans-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "../../../fonts/IBMPlexSans-Medium.ttf",
      fontWeight: "medium",
    },
    {
      src: "../../../fonts/IBMPlexSans-SemiBold.ttf",
      fontWeight: "semibold",
    },
  ],
});
// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#1a2234",
    padding: 30,
    fontFamily: "IBM",
    fontWeight: "normal",
  },
  container: {
    backgroundColor: "#1a2234",
    borderRadius: 10,
    padding: 20,
    color: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 176,
    height: 32,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  receiptTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  receiptInfo: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#3a4356",
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
    gap: 10,
  },
  detailBox: {
    width: "48%",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#232a3c",
    borderRadius: 5,
  },
  detailLabel: {
    fontSize: 12,
    color: "#a0a0a0",
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  terms: {
    marginTop: 10,
    marginBottom: 20,
  },
  termItem: {
    fontSize: 16,
    marginBottom: 5,
    flexDirection: "row",
  },
  bullet: {
    marginRight: 5,
  },
  footer: {
    marginTop: 10,
    fontSize: 16,
  },
  footerText: {
    marginBottom: 5,
  },
  ticketEdge: {
    height: 10,
    backgroundColor: "#1a2234",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});

interface BookReceiptProps {
  receiptId: string;
  dateIssued: string;
  bookTitle: string;
  bookAuthor: string;
  bookGenre: string;
  borrowDate: string;
  dueDate: string;
  duration: string;
  website?: string;
  email?: string;
}

const BookReceipt: React.FC<BookReceiptProps> = ({
  receiptId,
  dateIssued,
  bookTitle,
  bookAuthor,
  bookGenre,
  borrowDate,
  dueDate,
  duration,
  website = "bookwise.example.com",
  email = "support@bookwise.example.com",
}) => {
  console.log(BookWiseLightLogo.src);

  return (
    <Document>
      <Page size='A5' style={styles.page} wrap={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Image src={BookWiseLightLogo.src} style={styles.logo} />
          </View>

          {/* Receipt Title */}
          <View style={styles.receiptInfo}>
            <Text style={styles.receiptTitle}>Borrow Receipt</Text>
            <Text style={styles.infoText}>
              Receipt ID:{" "}
              <Text style={{ color: "#EED1AC", fontWeight: "bold" }}>
                {receiptId}
              </Text>
            </Text>
            <Text style={styles.infoText}>
              Date Issued:{" "}
              <Text style={{ color: "#EED1AC", fontWeight: "bold" }}>
                {dateIssued}
              </Text>
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Book Details */}
          <Text style={styles.sectionTitle}>Book Details:</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Title</Text>
              <Text style={styles.detailValue}>{bookTitle}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Author</Text>
              <Text style={styles.detailValue}>{bookAuthor}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Genre</Text>
              <Text style={styles.detailValue}>{bookGenre}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Borrowed on</Text>
              <Text style={styles.detailValue}>{borrowDate}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Due Date</Text>
              <Text style={styles.detailValue}>{dueDate}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>{duration}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Terms */}
          <Text style={styles.sectionTitle}>Terms</Text>
          <View style={styles.terms}>
            <View style={styles.termItem}>
              <Text style={styles.bullet}>•</Text>
              <Text>Please return the book by the due date.</Text>
            </View>
            <View style={styles.termItem}>
              <Text style={styles.bullet}>•</Text>
              <Text>Lost or damaged books may incur replacement costs.</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Thank you for using{" "}
              <Text style={{ color: "#EED1AC", fontWeight: "bold" }}>
                BookWise!
              </Text>
            </Text>
            <Text style={styles.footerText}>
              Website:{" "}
              <Text style={{ color: "#EED1AC", fontWeight: "bold" }}>
                {website}
              </Text>
            </Text>
            <Text style={styles.footerText}>
              Email:{" "}
              <Text style={{ color: "#EED1AC", fontWeight: "bold" }}>
                {email}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.ticketEdge} />
      </Page>
    </Document>
  );
};

export default BookReceipt;
