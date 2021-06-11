export const getAutoSuggestUsers = (usersList, limitString, loginSubstr) => {
    const numberReqEx = /^\d+$/;
    const limit = numberReqEx.test(limitString) ? Number(limitString) : null;
    let resultUsersList = [...usersList];

    if (loginSubstr) {
        resultUsersList = usersList.filter((user) =>
            user.login.includes(loginSubstr)
        );
    }

    resultUsersList.sort(sortUsers);

    if (limit) {
        resultUsersList = resultUsersList.slice(0, limit);
    }

    return resultUsersList;
};

export const sortUsers = (user1, user2) => (user1.login > user2.login ? 1 : -1);
