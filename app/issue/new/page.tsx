"use client";

import { Button, TextArea, TextField } from '@radix-ui/themes';
import React from 'react'
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

    const onSubmit: SubmitHandler<Issue> = async (data) =>{
        await axios.post("/api/issue", data);
        router.push("/issue")
    }

    return (
        <form className='max-w-xl space-y-3' onSubmit={handleSubmit(onSubmit)}>
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
    )
}

export default NewIssuePage;
