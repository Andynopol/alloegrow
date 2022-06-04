export const generatePlanForInterval = async ( start: Date, end: Date, count: number = 50 ) => {
    const interval = ( end.getTime() - start.getTime() ) / count;
    console.log( start.getTime(), end.getTime() );
    const plan: Array<Date> = [];
    for ( let i = 0; i < count; i++ ) {
        plan.push( getRandomDate( new Date( start.getTime() + i * interval ), new Date( start.getTime() + i * interval + interval ) ) );
        console.log( new Date( start.getTime() + ( i + 1 ) * interval ).toLocaleString(), "|", plan[ plan.length - 1 ].toLocaleString() );
    }
    return plan;
};

const getRandomDate = ( start: Date, end: Date ): Date => {
    return new Date( start.getTime() + Math.random() * ( end.getTime() - start.getTime() ) );
};