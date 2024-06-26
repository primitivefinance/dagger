import WalletConnector from '../WalletConnector'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Links from './links.json'
import { Button } from '../ui/button'
import React from 'react'
import Container from '../Container'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { cn } from '@/lib/utils'

const VERSION = 'v0.3.0'

const externalApplicationDisclaimer =
    'Disclaimer: Primitive applications are currently in beta, use at your own discretion. External applications are not affiliated with Primitive.'

const Wordmark = ({ className }) => {
    return (
        <Link to="/" aria-label="header">
            <img
                src="/primitive-wordmark-dark.png"
                width={144}
                height={144}
                alt={`Cover Image for ${'header'}`}
                className={cn('dark:invert', className)}
            />
        </Link>
    )
}

function Root(): JSX.Element {
    const loc = useLocation()

    const prevScrollY = React.useRef(0)
    const [scrolling, setGoingUp] = React.useState(false)

    // Check if scrolling on initial render.
    React.useEffect(() => {
        if (window.scrollY != 0) {
            setGoingUp(true)
        }
    }, [])

    // Check if scrolling and render the header with scrolling styles with it sticky to the top.
    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY == 0) {
                setGoingUp(false)
            }

            if (prevScrollY.current != currentScrollY && !scrolling) {
                setGoingUp(true)
            }

            prevScrollY.current = currentScrollY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => window.removeEventListener('scroll', handleScroll)
    }, [scrolling])

    return (
        <div
            className={`flex flex-col justify-between font-primary min-h-screen`}
        >
            <header
                className={`
                w-full min-h-16 
                sticky top-0 
                z-[999] 
                bg-white-100
                dark:bg-transparent
                ${
                    scrolling
                        ? 'drop-shadow-sm backdrop-filter backdrop-blur-sm bg-opacity-80 filter dark:bg-gray-900'
                        : 'bg-opacity-0'
                }`}
            >
                <Container>
                    <div className="flex flex-row items-center justify-between py-2">
                        <div className="w-1/4 flex-row flex gap-4 items-center justify-start">
                            <Link to="/" className="hover:no-underline">
                                <Wordmark className={'w-20'} />
                            </Link>
                        </div>
                        <ul className="flex-grow w-full flex-row flex gap-xs items-center">
                            <li
                                className={`${loc.pathname === '/' || loc.pathname.startsWith('/pool/') ? 'underline' : 'no-underline'}`}
                            >
                                <Button variant="link" asChild>
                                    <Link to="/">Pools</Link>
                                </Button>
                            </li>
                            <li
                                className={`${loc.pathname.startsWith('/curator') ? 'underline' : 'no-underline'}`}
                            >
                                <Button variant="link" asChild>
                                    <Link to="/curator">Curators</Link>
                                </Button>
                            </li>
                            <li
                                className={`${loc.pathname.startsWith('/faucet') ? 'underline' : 'no-underline'}`}
                            >
                                <Button variant="link" asChild>
                                    <Link to="/faucet">Get Started</Link>
                                </Button>
                            </li>
                        </ul>
                        <div className="w-full flex-row flex gap-4 items-center justify-end">
                            <ConnectButton />
                        </div>
                    </div>
                </Container>
            </header>
            <main className="mb-auto pt-16 pb-32">
                <Container>
                    <Outlet />
                </Container>
            </main>
            <footer className="bg-white-200 dark:bg-black py-xl">
                <Container>
                    <div className="flex flex-col gap-sm">
                        <div className="flex flex-col md:flex-row w-full justify-between gap-md">
                            <div className="flex flex-col pt-xl pb-lg gap-sm w-full md:w-1/2">
                                <Wordmark />
                                <small>
                                    © 2020-{new Date().getFullYear()} Primitive
                                    Bits, Inc. All rights reserved.
                                </small>
                            </div>
                            <div className="flex flex-col md:flex-row items-center w-full md:w-1/2 justify-end">
                                <div className="flex flex-col md:flex-row text-left w-full md:w-1/2 justify-end align-start md:align-center  gap-2">
                                    {Links.links.map((link, index) => (
                                        <a
                                            key={`${link}-${index}`}
                                            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                                            href={link.url}
                                        >
                                            {link.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div id="#row-7" className="flex flex-row w-1/2 gap-md">
                            <p className="disclaimer justify-start text-left">
                                {externalApplicationDisclaimer}
                            </p>
                        </div>
                    </div>
                </Container>
            </footer>
            <div
                className="select-none cursor-default"
                style={{
                    position: 'fixed',
                    bottom: '25px',
                    left: '25px',
                    zIndex: 1000, // Ensure it's above most elements
                }}
            >
                <div className="flex flex-col gap-0">
                    <small className="text-primary/20 dark:text-muted/75">
                        Primitive App
                    </small>
                    <small className=" text-primary/20 dark:text-muted/75">
                        Version {VERSION}
                    </small>
                </div>
            </div>
        </div>
    )
}

export default Root
