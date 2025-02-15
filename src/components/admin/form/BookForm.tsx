"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/FileUpload";
import ColorPicker from "../ColorPicker";
import { createBook, updateBook } from "@/lib/admin/actions/book";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

interface Props extends Partial<Book> {
  type: "create" | "update";
}

const BookForm = ({ type, ...book }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues:
      type === "update"
        ? book
        : {
            bookTitle: "",
            description: "",
            author: "",
            genre: "",
            rating: 1, // add this field
            totalNoOfBooks: 1,
            availableCopies: 1, // add this field
            bookImage: "",
            bookPrimaryColor: "#aabbcc",
            bookVideo: "",
            bookSummary: "",
            hideBook: false,
          },
  });

  const handleSubmit = async (values: z.infer<typeof bookSchema>) => {
    if (type === "update") {
      const result = await updateBook(values, book.id);
      if (result.success) {
        toast({
          title: "Success",
          description: "Book Updated successfully",
        });
        router.push(`/admin/books/${result.data.id}`);
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } else {
      const result = await createBook(values);
      if (result.success) {
        toast({
          title: "Success",
          description: "Book created successfully",
        });
        router.push(`/admin/books/${result.data.id}`);
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 w-full"
      >
        <FormField
          control={form.control}
          name={"bookTitle"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Book Title</FormLabel>
              <FormControl>
                <Input
                  required
                  type="text"
                  placeholder="Book Title"
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Book Description</FormLabel>
              <FormControl>
                <Textarea
                  required
                  placeholder="Book Description"
                  className="book-form_input resize-none"
                  {...field}
                  rows={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"author"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Book Author</FormLabel>
              <FormControl>
                <Input
                  required
                  type="text"
                  placeholder="Book Author"
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"genre"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Book Genre</FormLabel>
              <FormControl>
                <Input
                  required
                  type="text"
                  placeholder="Book Genre"
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"rating"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Book Ratting</FormLabel>
              <FormControl>
                <Input
                  required
                  type="number"
                  min={1}
                  max={5}
                  placeholder="Book Ratting"
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"totalNoOfBooks"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Total No. Of Books</FormLabel>
              <FormControl>
                <Input
                  required
                  type="number"
                  min={1}
                  max={1000}
                  placeholder="Book Ratting"
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"bookImage"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Book Cover</FormLabel>
              {/* Upload Component */}
              <FormControl>
                <FileUpload
                  variant="light"
                  placeholder="Upload Book Cover"
                  type="Image"
                  accept="image/*"
                  folder="books/covers"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"bookPrimaryColor"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Book Primary Color</FormLabel>
              <FormControl>
                <ColorPicker
                  value={field.value}
                  onPickerChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"bookVideo"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Book Video</FormLabel>
              <FormControl>
                <FileUpload
                  variant="light"
                  placeholder="Upload Book Video"
                  type="Video"
                  accept="video/*"
                  folder="/books/videos"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"bookSummary"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Book Summary</FormLabel>
              <FormControl>
                <Textarea
                  required
                  placeholder="Book Summary"
                  className="book-form_input resize-none"
                  {...field}
                  rows={10}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"hideBook"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                Hide Book From Website
              </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="ml-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-admin w-full text-white">
          {type === "create" ? "Add Book" : "Update Book"}
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
