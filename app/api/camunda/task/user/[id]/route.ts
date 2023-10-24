import { NextRequest, NextResponse } from "next/server";
import {asyncFilter} from "@/lib/utils";

export async function GET(req: NextRequest, {params}: { params: { id: string } }) {
    // console.log(req)
    // console.log(params)

    const userId = params.id;

    try {
        const response = await fetch(process.env.CAMUNDA_URL + `/task`, {
            headers: {
                'Content-Type': 'application/json'
            },
            cache: "no-store"
        });
        //console.log("Response", response)
        let data = await response.json();
        console.log("Data Length", data.length)
        //console.log("Data", data)
        data = await asyncFilter(data, async (task: any) => {
            return await isTaskOfUser(task.id, userId);
        });
        //console.log("Filtered data", data)
        return NextResponse.json(data);
    } catch (error) {
        console.log("Error", error)
        return NextResponse.error();
    }
}

async function isTaskOfUser(taskId: string, userIdToCheck: string): Promise<boolean> {
    return await fetch(process.env.CAMUNDA_URL + `/task/${taskId}/variables`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
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
