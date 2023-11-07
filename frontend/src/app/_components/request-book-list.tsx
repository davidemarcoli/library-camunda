"use client";

import {api} from "~/trpc/react";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "~/app/_components/ui/card";
import {Button} from "~/app/_components/ui/button";

export default function RequestBookList() {
    const allBookRequests = api.camunda.getAllBookRequestTasks.useQuery();

    function handleDecision(taskId: string, decision: boolean, book: any) {
        api.camunda.completeTaskWithVariables.useMutation({
            onSuccess: () => {
                allBookRequests.refetch()
            }
        }).mutateAsync({
            id: taskId,
            variables: {
                requestAccepted: {
                    value: decision,
                    type: "Boolean"
                }
            }
        }).then(r => {
            console.log(r)
            if (decision) {
                api.book.create.useMutation().mutateAsync({
                    title: book.title,
                    content: book.content,
                    author: book.author,
                }).then(r => {
                    console.log(r)
                });
            }
        })
    }

    return (
        <div className={'mt-8 bg-red-400'}>
            <h1 className={'text-2xl font-bold'}>All Book Requests (TEMPORARY)</h1>
            <ul>
                {allBookRequests.data?.map((task: any) => {
                    return {
                        book: JSON.parse(task.variables.book.value),
                        task: task
                    }
                }).map((data: any) => {
                    return (
                        <li key={data.task.id}>
                            <p>{data.book.title}</p>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{data.book.title} <span
                                        className={'text-sm'}>by {data.book.author}</span></CardTitle>
                                    <CardDescription>{data.book.content}</CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Button variant={"outline"}
                                            onClick={() => handleDecision(data.task.id, true, data.book)}>Yes</Button>
                                    <Button variant={"outline"}
                                            onClick={() => handleDecision(data.task.id, false, data.book)}>No</Button>
                                </CardFooter>
                            </Card>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}