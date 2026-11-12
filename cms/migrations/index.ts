import * as migration_20261112_144935_initial from './20261112_144935_initial';
import * as migration_20261112_150320_blob_object_key from './20261112_150320_blob_object_key';

export const migrations = [
  {
    up: migration_20261112_144935_initial.up,
    down: migration_20261112_144935_initial.down,
    name: '20261112_144935_initial',
  },
  {
    up: migration_20261112_150320_blob_object_key.up,
    down: migration_20261112_150320_blob_object_key.down,
    name: '20261112_150320_blob_object_key'
  },
];
