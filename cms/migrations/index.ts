import * as migration_20261112_144935_initial from './20261112_144935_initial';
import * as migration_20261112_150320_blob_object_key from './20261112_150320_blob_object_key';
import * as migration_20261112_161210_pages from './20261112_161210_pages';
import * as migration_20261112_170000_crop_partner_logos from './20261112_170000_crop_partner_logos';

export const migrations = [
  {
    up: migration_20261112_144935_initial.up,
    down: migration_20261112_144935_initial.down,
    name: '20261112_144935_initial',
  },
  {
    up: migration_20261112_150320_blob_object_key.up,
    down: migration_20261112_150320_blob_object_key.down,
    name: '20261112_150320_blob_object_key',
  },
  {
    up: migration_20261112_161210_pages.up,
    down: migration_20261112_161210_pages.down,
    name: '20261112_161210_pages',
  },
  {
    up: migration_20261112_170000_crop_partner_logos.up,
    down: migration_20261112_170000_crop_partner_logos.down,
    name: '20261112_170000_crop_partner_logos',
  },
];
