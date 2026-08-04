import { SearchAll } from '@/features/global-search/screens/SearchAll.tsx';
import { MigrationManager } from '@/features/migration/MigrationManager.ts';

export const MigrationManualSearch = () => (
    <SearchAll migrationDestinationSourceIds={MigrationManager.getState().destinationSourceIds} />
);
