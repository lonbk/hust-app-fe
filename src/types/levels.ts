export enum Levels {
    LEVEL_1 = 'VERY LOW',
    LEVEL_2 = 'LOW',
    LEVEL_3 = 'TARGET RANGE',
    LEVEL_4 = 'HIGH',
    LEVEL_5 = 'VERY HIGH'
}

export const statsLevel = [
    {
        level: Levels.LEVEL_5,
        threshold: '3.3%',
        range: '< 54 mg/dL',
        readings: 2
    },
    {
        level: Levels.LEVEL_4,
        threshold: '18.3%',
        range: '55 - 70 mg/dL',
        readings: 1
    },
    {
        level: Levels.LEVEL_3,
        threshold: '61.1%',
        range: '71 - 180 mg/dL',
        readings: 4
    },
    {
        level: Levels.LEVEL_2,
        threshold: '12.1%',
        range: '181 - 250 mg/dL',
        readings: 1
    },
    {
        level: Levels.LEVEL_1,
        threshold: '0.0%',
        range: '> 250 mg/dL',
        readings: 0
    },
]
