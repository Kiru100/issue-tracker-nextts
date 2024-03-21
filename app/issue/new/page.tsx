"use client";

import ErrorMessage from '@/app/components/ErrorMessage';
import TailwindSpinner from '@/app/components/TailwindSpinner';
import { validation_schema } from '@/app/validation_schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';

type Issue = z.infer<typeof validation_schema>

const NewIssuePage = () => {
    const { register, control, handleSubmit, formState: {errors} } = useForm<Issue>({
        resolver: zodResolver(validation_schema)
    });

    const router = useRouter();
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<Issue> = async (data) =>{
        try {
            setLoading(true);
            await axios.post("/api/issue", data);
            router.push("/issue");
        } catch (error) {
            setLoading(false);
            setError("An unexpected error occured.");
        }   
    }

    return (
        <div className='max-w-xl space-y-3'>
            {
                error &&
                <Callout.Root color='red'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>
            }
            <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
                <TextField.Root className='mb-2'>
                    <TextField.Input placeholder="Title" {...register("title")}/>
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller 
                    name="description"
                    control={control}
                    render={
                        ({field}) => <SimpleMDE placeholder="Type to write description..." {...field} />
                    }
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isLoading}>Submit New Issue {isLoading && <TailwindSpinner/>}  </Button>
            </form>
        </div>
    )
}

export default NewIssuePage;
