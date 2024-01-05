export const getTimeDiff = (createOn: string) => {
    const currentDate = new Date();
    const pastDate = new Date(createOn);
    // Chọn múi giờ Việt Nam (GMT+7)
    const vnTimezoneOffset = 7 * 60; // Offset tính bằng phút
    const vnCurrentDate = new Date(currentDate.getTime());
    // console.log('vietnamTimezoneOffset ', vnTimezoneOffset)
    // console.log('vietnamCurrentDate ', vnCurrentDate)
    // console.log('pd', pastDate )
    const vnPastDate = new Date(pastDate.getTime() + vnTimezoneOffset * 60000);
    // console.log('vnpd',vnPastDate)

    const timeDifference = vnCurrentDate.getTime() - vnPastDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    if (secondsDifference < 60) {
        if(secondsDifference<0){
            return `1s ago`;
        }
        return `${secondsDifference}s ago`;
    } else if (minutesDifference < 60) {
        return `${minutesDifference}m ago`;
    } else if (hoursDifference < 24) {
        return `${hoursDifference}h ago`;
    } else {
        return `${daysDifference}d ago`;
    }
}
