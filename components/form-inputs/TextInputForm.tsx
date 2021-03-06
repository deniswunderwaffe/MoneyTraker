import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {TextField} from "@mui/material";

export interface FormInputProps {
    name: string;
    control: any;
    label: string;
    setValue?: any;
}

export const TextInputForm = ({ name, control, label }: FormInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                         field: { onChange, value },
                         fieldState: { error },
                         formState,
                     }) => (
                <TextField
                    helperText={error ? error.message : null}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    label={label}
                    fullWidth
                    variant="outlined"
                />
            )}
        />
    );
};