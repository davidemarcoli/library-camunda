"use client";

import {useEffect, useState} from "react";
import {Book} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export default function Home() {

    const [books, setBooks] = useState<Book[]>([]);
    useEffect(() => {
        getBooks().then(value => {
            setBooks(value);
        });
    }, []);

    async function getBooks() {
        const books = await fetch('api/books').then(value => value.json());
        console.log('books', books);
        return books;
    }

    async function addNewBook() {
        console.log('add new book');
        fetch('api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: 'The Hobbit', content: 'In a hole in the ground there lived a hobbit.'}),
        }).then(async value => {
            console.log('value', await value.json());
            setBooks(await getBooks());
        }).catch(reason => {
            console.log('reason', reason);
        })
    }


    return (
        <>
            <Button onClick={addNewBook} className={'p-4 my-4'}>
                Add new book
            </Button>
            {books.map((book) => (
                // <div key={book.id} className={'border border-gray-300 p-4 my-4'}>
                //     <h2>{book.title}</h2>
                //     <p>{book.content}</p>
                // </div>
                <Card key={book.id} className={'p-4 my-4'}>
                    <CardHeader>
                        <CardTitle>{book.title}</CardTitle>
                        <CardDescription>{book.content}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </>
    )
}
