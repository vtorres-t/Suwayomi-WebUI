export class ControlledPromise<T = void> {
    private orgResolve!: (value: T | PromiseLike<T>) => void;

    private orgReject!: (reason?: any) => void;

    public readonly promise: Promise<T>;

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this.orgResolve = resolve;
            this.orgReject = reject;
        });
    }

    resolve(value: T): void {
        this.orgResolve(value);
    }

    reject(reason?: any): void {
        this.orgReject(reason);
    }
}
