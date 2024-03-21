"use client";

import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes';
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, SubmitHandler  } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { validation_schema } from '@/app/validation_schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


type Issue = z.infer<typeof validation_schema>

const NewIssuePage = () => {
    const { register, control, handleSubmit, formState: {errors} } = useForm<Issue>({
        resolver: zodResolver(validation_schema)
    });
    const router = useRouter();
    const [error, setError] = useState("");

    const onSubmit: SubmitHandler<Issue> = async (data) =>{
        try {
            await axios.post("/api/issue", data);
            router.push("/issue");
        } catch (error) {
            console.log(error);
            setError("An unexpected error occured.")
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
                { errors.title && <Text color='red' as='div'>{errors.title.message}</Text> }
                <Controller 
                    name="description"
                    control={control}
                    render={({field}) => <SimpleMDE placeholder="Type to write description..." {...field} />}
                />
                { errors.description && <Text color='red' as='div'>{errors.description.message}</Text> }
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage;
