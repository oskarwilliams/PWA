const url = 'http://localhost:5000';

export async function getQuestions () {
    return fetch(`${url}/questions`).then(data => data.json());
}

function mapToObjectRec(map) {
    const object = {};
    map.forEach((v, k) => object[k] = v instanceof Map ? mapToObjectRec(v) : v);
    return object;
}

export async function postAnswers (answers) {
    return fetch(`${url}/answers`, {
        method: 'POST',
        body: JSON.stringify(mapToObjectRec(answers)),
        headers: {
            'Content-Type': 'application/json'
        },
    });
}
