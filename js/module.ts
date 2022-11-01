

export default class Taskq {
    private _taskName: string
    private _deadLine: string
    private _done: boolean
    private _taskId: string
    constructor(taskName: string, deadLine: string, done: boolean) {
        this._taskName = taskName
        this._deadLine = deadLine
        this._done = done
        this._taskId = new Date().toISOString()
    }
    public getTaskId(): string {
        return this._taskId
    }
    public getDeadLine(): string {
        return this._deadLine
    }

    public setDeadLine(deadLine: string): void {
        this._deadLine = deadLine
    }

    public getDone(): boolean {
        return this._done
    }

    public setDone(done: boolean): void {
        this._done = done
    }

    public getTaskName(): string {
        return this._taskName
    }

    public setTaskName(taskName: string): void {
        this._taskName = taskName
    }



}