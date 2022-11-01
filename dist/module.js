export default class Taskq {
    constructor(taskName, deadLine, done) {
        this._taskName = taskName;
        this._deadLine = deadLine;
        this._done = done;
        this._taskId = new Date().toISOString();
    }
    getTaskId() {
        return this._taskId;
    }
    getDeadLine() {
        return this._deadLine;
    }
    setDeadLine(deadLine) {
        this._deadLine = deadLine;
    }
    getDone() {
        return this._done;
    }
    setDone(done) {
        this._done = done;
    }
    getTaskName() {
        return this._taskName;
    }
    setTaskName(taskName) {
        this._taskName = taskName;
    }
}
