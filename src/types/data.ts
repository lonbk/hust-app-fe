export interface PatientData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    disease: string;
    phone_number: string;
    address: string;
    family_stand: string;
    status: string;
    ocupation: string;
    avatar: string;
    nationality: string;
    company_name: string;
    department_name: string;
    date_of_birth: string;
}

export enum Stage {
    STAGE_1 = 'Stage 1',
    STAGE_2 = 'Stage 2',
    STAGE_3 = 'Stage 3',
    STAGE_4 = 'Stage 4'
}
