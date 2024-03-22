"use client";

import "easymde/dist/easymde.min.css";
import axios from 'axios';
import dynamic from 'next/dynamic';
import { ErrorMessage, TailwindSpinner } from "@/app/components";
import { validation_schema } from '@/app/validation_schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(
    () => import("react-simplemde-editor"),
    {ssr: false}
)

type IssueFormData = z.infer<typeof validation_schema>;

const IssueForm = async ({issue}: {issue?: Issue}) => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    const { register, control, handleSubmit, formState: {errors} } = useForm<IssueFormData>({
        resolver: zodResolver(validation_schema)
    });

    const onSubmit: SubmitHandler<IssueFormData> = async (data) =>{
        try {
            setLoading(true);
            
            if(issue){
                await axios.post(`/api/issue/${issue?.id}`, data);
            }else{
                await axios.post("/api/issue", data);
            }

            router.push("/issue");
            router.refresh();
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
                    <TextField.Input placeholder="Title" {...register("title")} defaultValue={issue?.title }/>
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller 
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={
                        ({field}) => <SimpleMDE placeholder="Type to write description..." {...field} />
                    }
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isLoading}>
                    {issue ? "Edit Issue" : "Submit New Issue"} 
                
                {isLoading && <TailwindSpinner/>}  </Button>
            </form>
        </div>
    )
}

export default IssueForm;
