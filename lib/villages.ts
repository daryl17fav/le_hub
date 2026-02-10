export const VILLAGES = [
    // Major Nigerian Villages/Communities
    'Village Alpha',
    'Village Beta',
    'Village Gamma',
    'Village Delta',
    'Village Epsilon',
    'Kano Village',
    'Lagos Hub',
    'Abuja Center',
    'Port Harcourt',
    'Kaduna Hub',
    'Enugu Hub',
    'Sokoto Center',
    'Calabar Hub',
    'Jos Center',
    'Ibadan Community',
    'Benin City Hub',
    'Maiduguri Center',
    'Zaria Village',
    'Aba Community',
    'Onitsha Hub',
    'Other',
];

export interface Village {
    name: string;
    region?: string;
}

export const getVillageList = (): string[] => {
    return VILLAGES;
};

export const isValidVillage = (village: string): boolean => {
    return VILLAGES.includes(village);
};
