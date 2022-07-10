export enum Levels {
    LEVEL_1 = 'Yếu',
    LEVEL_2 = 'Trung Bình',
    LEVEL_3 = 'Khá',
    LEVEL_4 = 'Giỏi',
    LEVEL_5 = 'Xuất sắc'
}

export const statsLevel = [
    { 
        level: Levels.LEVEL_5,
        threshold: '3.3%',
        range: '≥ 3.6',
        readings: 2
    },
    { 
        level: Levels.LEVEL_4,
        threshold: '18.3%',
        range: '3.2 - 3.59',
        readings: 1
    },
    {
        level: Levels.LEVEL_3,
        threshold: '61.1%',
        range: '2.5 - 3.19',
        readings: 4
    },
    {
        level: Levels.LEVEL_2,
        threshold: '12.1%',
        range: '2.0 - 2.49',
        readings: 1
    },
    {
        level: Levels.LEVEL_1,
        threshold: '0.0%',
        range: '≤ 2.0',
        readings: 0
    },
]
