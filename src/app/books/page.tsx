"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Book } from "@/components/ui/book";
import { books } from "@/data/books";

export default function BooksPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-10">
        <div className="space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-2"
          >
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Books
            </h1>
            <p className="text-md text-muted-foreground">
              All the books I have read till now.
            </p>
          </motion.div>

          {/* Book Covers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 justify-items-center items-center">
            {books.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                className="flex flex-col items-center justify-center"
              >
                <Book
                  title={book.title}
                  author={book.author}
                  image={book.image}
                  color={book.color}
                  width={180}
                  height={260}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <div className="mx-auto w-full max-w-3xl px-6 pb-20">
        <Footer />
      </div>

      <ProgressiveBlur
        className="fixed bottom-0 left-0 right-0 z-30"
        position="bottom"
        height="80px"
      />
    </>
  );
}
