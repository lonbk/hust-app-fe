export interface StudentData {
    id: number; 
    full_name: string;
    email: string;
    gender: string;
    class: string;
    mssv: string;
    status: number;
    avatar: string;
    department_name: string;
    date_of_birth: string;
}

export enum Stage {
    STAGE_1 = 'Stage 1',
    STAGE_2 = 'Stage 2',
    STAGE_3 = 'Stage 3',
    STAGE_4 = 'Stage 4'
}

export enum AppointmentStatus {
    STATUS_PENDING = 'Đang chờ',
    STATUS_ACTIVE = 'Đã xong',
    STATUS_NEW = 'Mới',
    STATUS_CLOSED = 'Đã hủy',
}



  