const url = 'http://localhost:5000';

export async function getQuestions () {
    return fetch(`${url}/questions`).then(data => data.json());
}

export async function postAnswers (answers) {
    const obj = {};
    answers.forEach((value, key) => obj[key] = value);
    return fetch(`${url}/answers`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        },
    });
}
