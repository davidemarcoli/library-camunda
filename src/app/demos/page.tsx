"use client";

import {Button} from "~/app/_components/ui/button";
import {useState} from "react";
import {api} from "~/trpc/react";

export default function StartProcessPage() {

    const [processId, setProcessId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");
    const [tasksOfUser, setTasksOfUser] = useState<any[] | undefined>(undefined);

    const startProcessMutation = api.camunda.startProcess.useMutation();
    const completeTaskMutation = api.camunda.completeTask.useMutation();
    const getTasksOfProcessMutation = api.camunda.getTasksOfProcess.useMutation();
    const getTasksOfUserMutation = api.camunda.getTasksOfUser.useMutation();

    function startProcess() {
        startProcessMutation.mutateAsync().then((response) => {
            setProcessId(response.id);
            getTasksOfProcess(response.id);
        }).catch((error) => {
            console.error(error);
        });
    }

    function completeTask() {
        completeTaskMutation.mutateAsync({id: taskId}).then(() => {
            setProcessId('');
            setTaskId('')
            getTasksFromUser();
        }).catch((error) => {
            console.error(error);
        });
    }

    function getTasksOfProcess(processId: string) {
        getTasksOfProcessMutation
          .mutateAsync({ processId })
          .then((response) => {
            setTaskId(response[0].id);
          })
          .catch((error) => {
            console.error(error);
          });
    }

    function getTasksFromUser() {
        getTasksOfUserMutation.mutateAsync().then((response) => {
            setTasksOfUser(response);
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
      <div className="flex min-h-screen flex-col items-center py-2 text-center">
        <main>
          <h1 className="m-4 text-6xl font-bold">Demos</h1>
          <Button onClick={startProcess} className={"mr-2"}>
            Start Process
          </Button>
          <Button onClick={() => getTasksFromUser()}>
            Get Tasks from User
          </Button>
          {processId && (
            <>
              <h2 className={"m-4 text-2xl font-bold"}>
                Process ID: {processId}
              </h2>
              <h3 className={"m-4 text-xl font-bold"}>Task ID: {taskId}</h3>
              <Button onClick={() => completeTask()}>Complete Task</Button>
            </>
          )}
          {tasksOfUser?.length && (
            <div className={"pt-4"}>
              <h2 className={"text-2xl"}>User Tasks</h2>
              <ul>
                {tasksOfUser.map((task) => (
                  <div key={task.id}>
                    {/* Assuming task is a string or number; if it's an object, you need to specify which property you're rendering */}
                    <li>{task.id}</li>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    );
}