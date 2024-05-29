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
import { toHex } from 'viem'
import { primitiveVirtualNet } from '../../App'

const formSchema = z.object({
    address: z.string().min(1),
})

function OnboardForm({ setOnboardOpen }): JSX.Element {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: '',
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
                    content: `New onboard request from ${
                        formData.address || 'anonymous'
                    }`,
                }),
            })

            if (response.ok) {
                resultMessage = 'onboard request sent!'
                setMessage(resultMessage)
                // Save the onboard request in local storage.
                localStorage.setItem('onboard', JSON.stringify(formData))
            } else {
                const data = await response.json()
                resultMessage = data.error || 'An error occurred.'
                setMessage(resultMessage)
            }
        } catch (error) {
            resultMessage = 'Failed to send the onboard request.'
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

    const switchToVirtualNet = async () => {
        if (window.ethereum) {
            window.ethereum
                .request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: toHex(primitiveVirtualNet.id),
                            chainName: primitiveVirtualNet.name.toString(),
                            rpcUrls: [
                                primitiveVirtualNet.rpcUrls.default.http[0].toString(),
                            ],
                            nativeCurrency: primitiveVirtualNet.nativeCurrency,
                            blockExplorerUrls: [
                                primitiveVirtualNet.blockExplorers.default.url.toString(),
                            ],
                        },
                    ],
                })
                .catch((error: any) => {
                    console.error(error)
                })
        }
    }

    const saveOnboard = () => {
        localStorage.setItem('onboard', 'true')
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
            >
                <FormDescription className="text-lg">
                    Hey! Welcome to Primitive. We built this app to make it easy
                    to interact with the yield and principal components of
                    yield-bearing assets.
                </FormDescription>
                <h2 className="text-lg font-bold">What you&apos;ll do</h2>
                <FormDescription className="text-lg">
                    Once you&apos;re onboarded to Primitive&apos;s virtual
                    testnet, you&apos;ll be able to convert your virtual net{' '}
                    <i>ether</i> into <i>Standardized Yield Tokens</i>. These
                    can be traded for either tokenized yield,{' '}
                    <i>Yield tokens</i>, or the short side of the yield called{' '}
                    <i>Principal tokens</i>.
                </FormDescription>
                <h2 className="text-lg font-bold">Onboard steps</h2>

                <div className="flex flex-col gap-sm">
                    <FormLabel asChild>
                        <h3>Add Primitive Virtual Net</h3>
                    </FormLabel>

                    <Button
                        onClick={async () => await switchToVirtualNet()}
                        variant="tx"
                    >
                        Add to Metamask
                    </Button>
                </div>

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Request Virtual Net Ether</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="address"
                                    className="flex-grow border"
                                    required={true}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-row items-center gap-md justify-between">
                    <Button variant="tx" type="submit">
                        {loading ? <LoadingDots /> : <p>Onboard</p>}
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() => {
                            saveOnboard()
                            setOnboardOpen(false)
                        }}
                        type="reset"
                    >
                        I&apos;m already onboarded
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default OnboardForm
