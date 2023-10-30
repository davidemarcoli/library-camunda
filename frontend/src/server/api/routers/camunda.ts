import {z} from "zod";

import {createTRPCRouter, publicProcedure,} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";
import {asyncFilter} from "~/lib/utils";

export const camundaRouter = createTRPCRouter({
    startProcess: publicProcedure
        //.input(z.object({processDefinitionKey: z.string().min(1)}))
        .mutation(async ({ctx/*, input*/}) => {
            try {
                const response = await fetch(process.env.CAMUNDA_URL + `/process-definition/key/${process.env.CAMUNDA_PROCESS_DEFINITION_KEY}/start`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        variables: {
                            user: {
                                type: "String",
                                value: ctx.session ? ctx.session.user.id : "Anonymous"
                            }
                        }
                    })
                });
                return (await response.json());
            } catch (error) {
                return new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong',
                });
            }
        }),

    completeTask: publicProcedure
        .input(z.object({id: z.string().min(1)}))
        .mutation(async ({input}) => {
            try {
                await fetch(process.env.CAMUNDA_URL + `/task/${input.id}/complete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                return {};
            } catch (error) {
                return new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong',
                });
            }
        }),

    getTasksOfProcess: publicProcedure
        .input(z.object({processId: z.string().min(1)}))
        .mutation(async ({input}) => {
            try {
                const response = await fetch(process.env.CAMUNDA_URL + `/task?executionId=${input.processId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    cache: "no-store"
                });
                return (await response.json());
            } catch (error) {
                return new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong',
                });
            }
        }),

    getTasksOfUser: publicProcedure
        .mutation(async ({ctx}) => {
            try {
                const response = await fetch(process.env.CAMUNDA_URL + `/task`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    cache: "no-store"
                });
                let data = await response.json();
                data = await asyncFilter(data, async (task: any) => {
                    return await isTaskOfUser(task.id, ctx.session ? ctx.session.user.id : "Anonymous");
                });
                return data;
            } catch (error) {
                return new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong',
                });
            }
        }),
});

async function isTaskOfUser(taskId: string, userIdToCheck: string): Promise<boolean> {
    return await fetch(process.env.CAMUNDA_URL + `/task/${taskId}/variables`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: "no-store"
    })
        .then(response => response.json())
        .then(variables => {
            // console.log("Variables", variables.user)
            //console.log("Variables Keys", Object.keys(variables))
            if (variables.user && variables.user.value === userIdToCheck) {
                console.log(`Task ${taskId} is a "Lend Book" task for user ID: ${userIdToCheck}`);
                return true;
            }
            return false;
        })
        .catch(error => {
            console.error('Error fetching variables for task:', taskId, error)
            return false;
        });
}