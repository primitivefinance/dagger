
import Links from './links.json'

const Wordmark = () => {
  return (
    <a href="https://primitive.xyz" target="_blank" aria-label="header">
      <img
        src="../assets/primitive-wordmark-light.png"
        width={144}
        height={144}
        alt={`Cover Image for ${'header'}`}
      />
    </a>
  )
}

const Footer = () => {
  return (
    <footer className="bg-white-200 py-xl">
        <div className="flex flex-col gap-lg p-5 justify-between">
          <div id="#row-7" className="flex flex-row items-center w-full gap-md p-5">
            <div className="flex flex-col pt-xl pb-lg gap-sm w-full md:w-1/2">
              <div className="flex flex-row w-full md:w-1/2 justify-between align-center gap-2 mb-3">
                {Links.links.map((link, index) => (
                  <a
                    key={`${link}-${index}`}
                    className="text-gray-200 hover:text-white hover:underline"
                    href={link.url}
                    target="_blank"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
              <br />
              <small>
                © 2020-{new Date().getFullYear()} Primitive Bits, Inc. All
                rights reserved.
              </small>
            </div>
            <p className="text-gray-400 disclaimer justify-between text-left">
              Disclaimer: This website is for informational purposes only. The
              information contained herein is not intended to be and should not
              be construed as legal, tax, investment, financial, or other
              advice. The information contained herein is not intended to be and
              should not be construed as an offer to provide investment advisory
              or other services by Primitive. The information contained herein
              is not intended to be and should not be construed as investment
              research. The information contained herein is not intended to be
              and should not be construed as a recommendation by Primitive to
              engage in any specific investment strategy.
            </p>
          </div>
        </div>
    </footer>
  )
}

export default Footer