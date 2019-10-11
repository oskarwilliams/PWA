import React, { useEffect, useState } from 'react';
import { getQuestions, postAnswers } from '../utils/apiUtils';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Paper, Button, Divider } from '@material-ui/core';
import _ from 'lodash';
import Question from './Question';

const useStyles = makeStyles(theme => ({
    paper: {
        margin: `${theme.spacing(3)}px auto`,
        width: '80%',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    question: {
        padding: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '70%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    radio: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    checkbox: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    select: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    date: {
        width: 300,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

const SurveyForm = () => {
    const classes = useStyles();
    const [questions, setQuestions] = useState();
    const [answers, setAnswers] = useState();
    const [defaultAnswers, setDefaultAnswers] = useState();

    const handleChange = question => event => {
        if (question.type === 'checkbox') {
            return setAnswers(prevAnswers => {
                const options = new Map(prevAnswers.get(question.name));
                options.set(event.target.value, !options.get(event.target.value));
                return new Map(prevAnswers.set(question.name, options));
            });
        }
        if (question.type === 'date') {
            const value = event;
            return setAnswers(state => new Map(state.set(question.name, value)));
        }
        const value = event.target.value;
        return setAnswers(state => new Map(state.set(question.name, value)));

    };

    const createAnswerMap = (loadedQuestions) => {
        return new Map(loadedQuestions.map(question => {
            let value = '';
            if (question.type === 'checkbox') {
                value = new Map(question.options.map(option => [option, false]));
            }
            if (question.type === 'date') {
                value = null;
            }
            return [question.name, value];
        }));
    };

    const submitAnswers = () => {
        postAnswers(answers)
            .catch(() => window.alert('You are not connected to the internet, your submission has been cached for 24 hours and will be submitted when you reconnect to the internet'))
            .finally(() => setAnswers(new Map(defaultAnswers)));
    };

    useEffect(() => {
        getQuestions()
            .then(loadedQuestions => {
                const answerMap = createAnswerMap(loadedQuestions);
                setAnswers(answerMap);
                setDefaultAnswers(_.cloneDeep(answerMap));
                setQuestions(loadedQuestions);
            });
    },[]);

    if (!questions) {
        return null;
    }

    return (
        <Paper className={classes.paper}>
            <form
                className={classes.container}
                noValidate
                autoComplete="off"
            >
                {questions.map(question => (
                    <div key={question.name}>
                        <Divider variant="fullWidth"/>
                        <div className={classes.question}>
                            <Question
                                answers={answers}
                                classes={classes}
                                onChange={handleChange}
                                question={question}
                            />
                        </div>
                    </div>
                ))}
            </form>
            <Button variant="outlined" color="inherit" className={classes.button} onClick={submitAnswers}>
                Submit
            </Button>
        </Paper>
    );

};

export default SurveyForm;
