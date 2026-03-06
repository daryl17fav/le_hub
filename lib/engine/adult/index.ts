
import { Exercise, SkillLevel } from '../studentLevel';
import { generateMobileSecurityExercise } from './mobileSecurityExercises';
import { generateDigitalCommerceExercise } from './digitalCommerceExercises';
import { generateHealthCommunityExercise } from './healthCommunityExercises';
import { generateFinanceExercise } from './financeExercises';
import { generateDigitalLiteracyExercise } from './digitalLiteracyExercises';
import { generateAgriExercise } from './agriExercises';
import {
    generateMobileSecurity_L1,
    generateMobileSecurity_L2,
    generateMobileSecurity_L3,
    generateMobileSecurityCourse,
    generateMobileSecurityFinalTest,
} from './mobileSecurityCourse';

/**
 * Adult Courses Exercise Generator Index
 * Maps skill IDs to their generator functions.
 */

export const generateAdultExercise = (skill: string, level: SkillLevel): Exercise | null => {
    switch (skill) {
        // Mobile Security — full course (3 lessons + final test)
        case 'mobile_security_l1':
            return generateMobileSecurity_L1();
        case 'mobile_security_l2':
            return generateMobileSecurity_L2();
        case 'mobile_security_l3':
            return generateMobileSecurity_L3();
        case 'mobile_security_final':
            return generateMobileSecurityFinalTest()[Math.floor(Math.random() * 10)];
        case 'mobile_security':
            return generateMobileSecurityCourse(level);

        // Other adult courses
        case 'digital_commerce':
            return generateDigitalCommerceExercise(level);
        case 'health_community':
        case 'health_wellbeing':
            return generateHealthCommunityExercise(level);
        case 'finance_101':
            return generateFinanceExercise(level);
        case 'digital_literacy_101':
            return generateDigitalLiteracyExercise(level);
        case 'agri_101':
            return generateAgriExercise(level);
        default:
            return null;
    }
};

export {
    generateMobileSecurityExercise,
    generateMobileSecurity_L1,
    generateMobileSecurity_L2,
    generateMobileSecurity_L3,
    generateMobileSecurityCourse,
    generateMobileSecurityFinalTest,
    generateDigitalCommerceExercise,
    generateHealthCommunityExercise,
    generateFinanceExercise,
    generateDigitalLiteracyExercise,
    generateAgriExercise,
};
