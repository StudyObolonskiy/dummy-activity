const dummy = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('resolved');
        }, 1500);
    }); 
}

const nonsense = () => {
    dummy().then((result) => {
        console.log(result);
    });
}