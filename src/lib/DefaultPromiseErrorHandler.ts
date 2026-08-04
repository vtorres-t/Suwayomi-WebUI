export const defaultPromiseErrorHandler =
    (name: string, allowProd: boolean = false) =>
    (error: any) => {
        if (!allowProd && import.meta.env.PROD) {
            return;
        }

        // oxlint-disable-next-line no-console
        console.error(`${name} failed due to`, error);
    };
