export const VILLAGES = [
    // Major Benin Republic Cities and Communes
    'Cotonou',
    'Porto-Novo',
    'Parakou',
    'Djougou',
    'Bohicon',
    'Kandi',
    'Abomey',
    'Natitingou',
    'Lokossa',
    'Ouidah',
    'Savalou',
    'Pobé',
    'Kétou',
    'Malanville',
    'Nikki',
    'Bembèrèkè',
    'Tchaourou',
    'Dassa-Zoumé',
    'Savé',
    'Comé',
    'Allada',
    'Aplahoué',
    'Dogbo',
    'Grand-Popo',
    'Athiémé',
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
