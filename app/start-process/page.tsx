"use client";

import {Button} from "@/components/ui/button";
import {useState} from "react";

export default function StartProcessPage() {

    const [processId, setProcessId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");

    function startProcess() {
        console.log("Starting process...");
        fetch('/api/camunda/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            console.log(data);
            setProcessId(data.id);
            getTask();
        }).catch(error => {
            console.error(error);
        });
    }

    function completeTask() {
        console.log(`Completing task ${taskId}...`);
        fetch(`/api/camunda/task/${taskId}/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            console.log(data);
            //setProcessId('');
        }).catch(error => {
            console.error(error);
        });
    }

    function getProcessInstance() {
        console.log(`Getting Process Instance ${processId}...`);
        fetch(`/api/camunda/process-instance/${processId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            console.log(data);
        }).catch(error => {
            console.error(error);
        });
    }

    function getTask() {
        console.log(`Getting Task of ${processId}...`);
        fetch(`/api/camunda/task`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            console.log(data);
            setTaskId(data[0].id);
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="flex flex-col min-h-screen py-2 items-center text-center">
            <main>
                <h1 className="text-6xl font-bold m-4">
                    Start Process
                </h1>
                <Button onClick={startProcess}>
                    Start Process
                </Button>
                {processId && (
                    <>
                        <h2 className="text-2xl font-bold m-4">
                            Process ID: {processId}
                        </h2>
                        <h3 className="text-xl font-bold m-4">
                            Task ID: {taskId}
                        </h3>
                        <Button onClick={() => getProcessInstance()}>
                            Get Instance
                        </Button>
                        <Button onClick={() => completeTask()}>
                            Complete Task
                        </Button>
                    </>
                )}
            </main>
        </div>
    )
        ;
}