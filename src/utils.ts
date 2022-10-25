export const getFormattedDate = (time: number): string => {
    const formatDate = (date: number): string => {
        return date < 10 ? `0${date}` : String(date);
    };

    const formatMonth = (month: number): string => {
        return month < 9 ? `0${month + 1}` : String(month + 1);
    };

    const formatHours = (hours: number): string => {
        return hours < 10 ? `0${hours}` : String(hours);
    };

    const formatMinutes = (minutes: number): string => {
        return minutes < 10 ? `0${minutes}` : String(minutes);
    };

    const dateObj = new Date(time * 1000);
    const date = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const formattedDate = `${formatDate(date)}.${formatMonth(month)}.${year}, ${formatHours(hours)}:${formatMinutes(minutes)}`;

    return formattedDate;
};

export const getFormattedComment = (data: string) => {
    return {__html: data};
};