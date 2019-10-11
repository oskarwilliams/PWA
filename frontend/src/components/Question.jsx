import React from 'react';
import { RadioGroup, TextField, FormControlLabel, FormControl, FormLabel, Radio, FormGroup, Checkbox, InputLabel, Select } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Question = ({ question, onChange, answers, classes }) => {
    switch (question.type) {
        case 'text':
            return (
                <FormControl className={classes.textField}>
                    <TextField
                        key={question.name}
                        label={question.name}
                        value={answers.get(question.name)}
                        InputProps={{ onChange: onChange(question) }}
                        margin="normal"
                        variant="filled"
                        fullWidth
                        multiline
                    />
                </FormControl>
            );
        case 'radio':
            return (
                <FormControl component="fieldset" className={classes.radio}>
                    <FormLabel component="legend">{question.name}</FormLabel>
                    <RadioGroup name={question.name} value={answers.get(question.name)} onChange={onChange(question)} row>
                        {question.options.map(option => (
                            <FormControlLabel
                                key={option}
                                value={option}
                                control={<Radio color="primary" />}
                                label={option}
                                labelPlacement="bottom"
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            );
        case 'checkbox':
            return (
                <FormControl component="fieldset" className={classes.checkbox}>
                    <FormLabel component="legend">{question.name}</FormLabel>
                    <FormGroup>
                        {question.options.map(option => (
                            <FormControlLabel
                                key={option}
                                control={
                                    <Checkbox checked={answers.get(question.name)[option]} onChange={onChange(question)} value={option} />
                                }
                                label={option}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            );
        case 'select':
            return (
                <FormControl variant="filled" className={classes.select}>
                    <InputLabel htmlFor="filled-age-native-simple">{question.name}</InputLabel>
                    <Select
                        native
                        value={answers.get(question.name)}
                        onChange={onChange(question)}
                    >
                        <option value=""/>
                        {
                            question.options.map(option => (
                                <option value={option} key={option}>{option}</option>
                            ))
                        }
                    </Select>
                </FormControl>
            );
        case 'date':
            return (
                <FormControl className={classes.date}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label={question.name}
                            value={answers.get(question.name)}
                            onChange={onChange(question)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </FormControl>
            );
        default:
            return 'Placeholder random string, actually not that random if you think about it.';
    }
};

export default Question;
