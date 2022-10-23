export const getDate = time => {
    const date = time * 1000;
    const formattedDate = `${new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : new Date(date).getDate()}.${new Date(date).getMonth() < 9 ? `0${new Date(date).getMonth() + 1}` : new Date(date).getMonth() + 1}.${new Date(date).getFullYear()}, ${new Date(date).getHours() < 10 ? `0${new Date(date).getHours()}` : new Date(date).getHours()}:${new Date(date).getMinutes() < 10 ? `0${new Date(date).getMinutes()}` : new Date(date).getMinutes()}`;

    return formattedDate;
};

export const createMarkup = data => {
    return {__html: data};
};