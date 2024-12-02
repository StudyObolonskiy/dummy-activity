const resultArea = document.querySelector('#result');

const ol = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Open league');
        }, 1500);
    });
}

ol().then((result) => {
    resultArea.innerText = result;
});

console.log(resultArea);
