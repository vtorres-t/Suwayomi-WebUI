import type { Location } from 'react-router-dom';

type GenericLocation<State = any> = Omit<Location, 'state'> & { state?: State };

declare module 'react-router-dom' {
    export function useParams<Params extends { [K in keyof Params]: string } = Record<string, string>>(): Params;

    export function useLocation<State = any>(): GenericLocation<State>;
}
