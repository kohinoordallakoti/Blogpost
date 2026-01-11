import React from 'react'

const Home = () => {
  return (
    <div>
        <div className="flex md:flex-row justify-between mx-10 my-20 bg-amber-50">
          <section className="w-1/2">
            <div className="flex flex-col gap-5">

              <h1 className="text-3xl font-bold">Blogging App</h1>
              <p className="text-xl font-semibold">Welcome! Explore Our App which provides features for posting blogs, liking and commenting on them.</p>
              <p className="text-md font-light"> If you want to experience the full potential of our app, please register now.</p>
              
              <div className="flex items-center my-5">
                <button className="mx-7 px-4 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-500 text-lg">Login</button>
                <button className="mx-7 px-4 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-500 text-lg">Register</button>
              </div>
            </div>
          </section>
          <section className="w-1/2 flex justify-center">
            <img src="./homepage.png" alt="" width={700} height={650} className="rounded overflow-clip" />
          </section>
        </div>
    </div>
  )
}

export default Home