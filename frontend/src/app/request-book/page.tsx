"use client";

import {Button} from "~/app/_components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "~/app/_components/ui/form";
import {getSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {Session} from "next-auth";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "~/app/_components/ui/input";
import {Textarea} from "~/app/_components/ui/textarea";
import {api} from "~/trpc/react";

const formSchema = z.object({
    title: z.string(),
    content: z.string(),
    author: z.string(),
});

export default function RequestBooks() {

    const requestBookMutation = api.camunda.startBookRequestProcess.useMutation();

    const [session, setSession] = useState<Session | undefined>(undefined);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            setSession(session || undefined);
        };
        fetchSession();
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            author: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        requestBookMutation.mutateAsync({
            title: values.title,
            content: values.content,
            author: values.author,
        }).then(r => console.log(r));
    }

    return (
        <div className={'flex flex-col items-center justify-center'}>
            <h1 className={'mt-4 text-4xl font-bold'}>Request Book</h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="m-16 w-96 space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="author"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}
