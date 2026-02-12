import AccountSettings from '@/modules/account-settings';
import { DEFAULT_METADATA } from '@/seo/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...DEFAULT_METADATA.accountSettingsUserMenuMetadata,
};

export default AccountSettings;
