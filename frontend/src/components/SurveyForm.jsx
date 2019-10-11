import React, { useEffect, useState } from 'react';
import { getQuestions, postAnswers } from '../utils/apiUtils';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

const SurveyForm = () => {
    const classes = useStyles();
    const [questions, setQuestions] = useState();
    const [answers, setAnswers] = useState();
    const [defaultAnswers, setDefaultAnswers] = useState();

    const handleChange = name => event => {
        const value = event.target.value;
        setAnswers(state => new Map(state.set(name, value)));
    };

    const submitAnswers = () => {
        postAnswers(answers)
            .catch(() => window.alert('You are not connected to the internet, your submission has been cached for 24 hours and will be submitted when you reconnect to the internet'))
            .finally(() => setAnswers(new Map(defaultAnswers)));
    };

    useEffect(() => {
        getQuestions()
            .then(loadedQuestions => {
                const answerMap = new Map();
                loadedQuestions.forEach(question => answerMap.set(question, ''));
                setAnswers(new Map(answerMap));
                setDefaultAnswers(new Map(answerMap));
                setQuestions(loadedQuestions);
            });
    },[]);

    if (!questions) {
        return null;
    }

    return (
        <>
            <form
                className={classes.container}
                noValidate
                autoComplete="off"
            >
                {questions.map(question => {
                    return (
                        <TextField
                            key={question}
                            label={question}
                            className={classes.textField}
                            value={answers.get(question)}
                            InputProps={{ onChange: handleChange(question) }}
                            margin="normal"
                            variant="filled"
                            fullWidth
                        />
                    );
                })}
            </form>
            <Button variant="outlined" color="inherit" className={classes.button} onClick={submitAnswers}>
                Submit
            </Button>
        </>
    );

};

export default SurveyForm;
