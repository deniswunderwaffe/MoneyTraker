import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useFormContext, Controller} from "react-hook-form";

interface Option {
    id: string;
    name: string;
}

interface FormSelectProps {
    name: string;
    control: any;
    label: string;
    options: Option[];
}

export const SelectInputForm = ({name, control, label, options}: FormSelectProps) => {

    const generateSelectOptions = () => {
        return options.map((option) => {
            return (
                <MenuItem key={option.id} value={option.id}>
                    {option.name}
                </MenuItem>
            );
        });
    };

    return <Controller
        control={control}
        name={name}
        render={({field: {onChange, value}}) => (
            <>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={onChange}
                    value={value}
                    label={label}>
                    {generateSelectOptions()}
                </Select>
            </>
        )}
    />
};