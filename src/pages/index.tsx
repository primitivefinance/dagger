'use client'

import { title, subtitle } from '@/data/copy/home'

export default function Home() {
  return (
    <>
      <div className="w-full py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="max-w-md gap-4 flex flex-col">
            <h1>{title}</h1>
            <h3 className="leading-tight text-dagger3 font-normal">
              {subtitle}              
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}