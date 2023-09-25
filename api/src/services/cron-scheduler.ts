import cron from 'node-cron';
import config from 'config';


type TaskDefinitionList = {
    taskName: string;
    task: () => void;
}[];

export default class CronScheduler {
    constructor(taskDefinitionList: TaskDefinitionList) {
        const cronSchedules: { [k: string]: string } =
            config.get('cronSchedules');
        console.log(cronSchedules)
        taskDefinitionList.forEach(({
            taskName,
            task,
        }) => {
            console.log(taskName, cronSchedules, cronSchedules[taskName], task)
            cron.schedule(cronSchedules[taskName], task);
        });
    }
}