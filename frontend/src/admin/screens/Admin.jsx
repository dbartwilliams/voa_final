import React from 'react'

const Admin = () => {
  return (
    <div lassName="flex flex-col gap-y-20 md:gap-y-32 overflow-hidden">
      <section className="relative pt-32 lg:pt-36">
      {" "}
      <div className="flex flex-col gap-5 lg:flex-row lg:gap-6">
        {/* <div className="absolute inset-y-0 w-full lg:w-1/2 lg:right-0">
          <span
            className="absolute hidden w-24 h-24 rotate-90 skew-x-12 -left-6 md:left-4 top-24 lg:top-28 rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 blur-xl opacity-60 lg:opacity-95 lg:block"
          ></span>
          <span className="absolute w-24 h-24 right-4 bottom-12 rounded-3xl bg-primary blur-xl opacity-80"></span>
        </div> */}

        <div
          className="relative flex flex-col items-center max-w-3xl mx-auto text-center lg:text-left lg:py-8 lg:items-start lg:max-w-none lg:mx-0 lg:flex-1 lg:w-1/2" >
          <h1 className="text-3xl font-bold text-heading-1 sm:text-4xl md:text-5xl xl:text-5xl">
              The | New Generation.We do not forgive. We do not forget.
            <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
            We reclaim our future{" "}
            </span>
          </h1>
          <p className="mt-8 text-2xl">
          Africa is a crime scene, bleeding from the wounds of colonization, endless genocides and imperialism. The land needs time to heal, but NOT in the present of the colonizers." The wounds of our ancestors demand justice, not silence.
          </p>
          <div className="flex w-full max-w-md mx-auto mt-10 lg:mx-0">
            <div className="flex flex-col w-full gap-5 sm:flex-row">
              <form
                action="#"
                className="flex items-center w-full gap-3 py-1 pl-6 pr-1 ease-linear border rounded-full shadow-lg text-heading-3 shadow-box-shadow border-box-border bg-box-bg focus-within:bg-body focus-within:border-primary"
              >
                <span className="pr-2 border-r min-w-max border-box-border">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="support@voiceofafrica.co.uk"
                  className="w-full py-3 bg-transparent outline-none"
                />
                {/* <Button className="text-white min-w-max">
                  <span className="relative z-[5]">Get Started</span>
                </Button> */}
              </form>
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 max-w-3xl mx-auto mr-10 lg:w-1/2 lg:h-auto lg:max-w-non lg:mx-0">
          <img
            src="https://images.pexels.com/photos/7773731/pexels-photo-7773731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Hero image"
            width={2350}
            height={2359}
            className="object-cover lg:absolute lg:w-full lg:h-full rounded-3xl lg:max-h-non max-h-96"
          />
        </div>
      </div>
      {/* <Numbers /> */}
    </section>
    </div>
  )
}

export default Admin
