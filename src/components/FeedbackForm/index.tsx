'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '../ui/use-toast'
import { LoadingDots } from '../TransactionButton'

const formSchema = z.object({
    feedback: z.string().min(1),
    contact: z.string().optional(),
})

function FeedbackForm(): JSX.Element {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            feedback: '',
            contact: '',
        },
    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
        let resultMessage = ''

        setLoading(true)
        try {
            const response = await fetch('/api/discordWebhook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: `New product feedback ${formData.feedback} from ${
                        formData.contact || 'anonymous'
                    }`,
                }),
            })

            if (response.ok) {
                resultMessage = 'Feedback sent!'
                setMessage(resultMessage)
            } else {
                const data = await response.json()
                resultMessage = data.error || 'An error occurred.'
                setMessage(resultMessage)
            }
        } catch (error) {
            resultMessage = 'Failed to send the feedback.'
            setMessage(resultMessage)
        }

        toast({
            title: resultMessage,
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(formData, null, 2)}
                    </code>
                </pre>
            ),
        })
        setLoading(false)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="feedback"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Feedback</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Feedback"
                                    className="flex-grow border"
                                    required={true}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Directly send us a message with any product
                                feedback or issues!
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact (optional)</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="e.g. telegram + handle, email, etc."
                                    className="flex-grow border"
                                    required={false}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant="tx" type="submit">
                    {loading ? <LoadingDots /> : <p>Submit</p>}
                </Button>
            </form>
        </Form>
    )
}

export default FeedbackForm
