'use client'

import { Suspense } from 'react'
import { title, subtitle } from '@/data/copy/home'
import Layout from './layout'

export default function Home() {
  return (
    <Layout>
      <Suspense fallback={<h1>Loading...</h1>}>
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
      </Suspense>
    </Layout>
  );
}