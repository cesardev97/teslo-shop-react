

export const nickName = (fullname: string | undefined) => {
    if (!fullname) return;

    let userNameInitials = '';
    const userNameArray = fullname.split(' ') || [];

    if (userNameArray.length == 1) {
        userNameInitials = fullname.substring(0, 2).toUpperCase();
    } else if (userNameArray.length > 1) {
        userNameInitials = `${userNameArray[0].substring(0, 1)} ${userNameArray[1].substring(0, 1)}`.toUpperCase();
    }

    return userNameInitials;
}