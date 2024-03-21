"use client";

import { Button, Callout, TextArea, TextField } from '@radix-ui/themes';
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, SubmitHandler  } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Issue{
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const { register, control, handleSubmit } = useForm<Issue>();
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
                <Controller 
                    name="description"
                    control={control}
                    render={({field}) => <SimpleMDE placeholder="Type to write description..." {...field} />}
                />
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage;
