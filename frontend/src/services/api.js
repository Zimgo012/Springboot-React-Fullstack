
let checkStatus = res => {
    if(res.ok) {return res}

    const err = new Error(res.statusText);
    err.response = res;
    return Promise.reject(err);
};

export const getAllStudent = () =>
    fetch("api/v1/students",{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(checkStatus);

export const addNewStudent = (student) =>
    fetch("api/v1/students",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student)
    })
