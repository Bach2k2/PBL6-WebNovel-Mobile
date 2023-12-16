export const getTimeDiff = (createOn: string) => {

    const currentDate = new Date();
    const pastDate = new Date(createOn);

    const timeDifference = currentDate.getTime() - pastDate.getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

    if(hoursDifference>24){
        return ` ${Math.round(hoursDifference/24)}d ago`
    }else{
        return ` ${hoursDifference}h ago`
    }
}