import { CaretDownIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-label'

type TokenAmountInputProps = {
    tokenAddress: `0x${string}`
    tokenSymbol: string
    tokenBalance: number
    tokenLogo: string
    tokenPrice: number
    amount: string
    setAmount: (amount: string) => void
    disabled?: boolean
}
Label
export function TokenAmountInactive(props: TokenAmountInputProps): JSX.Element {
    return (
        <div className="flex flex-row bg-dagger1 rounded-xl gap-sm w-full justify-between">
            <Button
                variant="secondary"
                disabled={props.disabled}
                className="w-1/4"
            >
                <div className="flex flex-row items-center gap-xs w-full">
                    <img
                        src={props.tokenLogo}
                        alt={props.tokenSymbol}
                        className="rounded-full w-4 h-4 mr-auto"
                    />
                    <span className="truncate">{props.tokenSymbol}</span>
                </div>
            </Button>

            <Input
                value={props.amount}
                onChange={(e) => props.setAmount(e.target.value)}
                placeholder="0.0"
                disabled={props.disabled}
                className="w-1/2"
            />
            <Label className="text-sm font-semibold ml-1 w-1/4">
                $
                {isNaN(parseFloat(props.amount))
                    ? '0.0'
                    : (
                          props.tokenPrice * parseFloat(props.amount)
                      )?.toLocaleString(undefined)}
            </Label>
            {!props.disabled && (
                <Button
                    className="p-0 border-0 hover:opacity-100 bg-transparent hover:bg-blue-800"
                    disabled={props.disabled}
                >
                    <div className="flex flex-row gap-1 justify-end items-center group">
                        <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                className="text-dagger3 group-hover:text-dagger4"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M17 8H5m12 0c.6 0 1 .4 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1Z"
                            />
                        </svg>
                        <Label
                            className="text-sm text-dagger3 group-hover:text-dagger4"
                            onClick={() =>
                                props.setAmount(props.tokenBalance.toString())
                            }
                        >
                            {props.tokenBalance
                                ? props.tokenBalance.toLocaleString(undefined)
                                : '0.0'}{' '}
                            {props.tokenSymbol}
                        </Label>
                    </div>
                </Button>
            )}
        </div>
    )
}
