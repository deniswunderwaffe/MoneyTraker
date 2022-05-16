import type { NextPage } from 'next'
import Head from 'next/head'
import {Typography} from "@mui/material";


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Money Tracker App</title>
      </Head>
      <main >
        <h1>
          Welcome to Money Tracker App
        </h1>
          <Typography>
              Add places where you spend money<br/><br/>
              Add purchase info<br/><br/>
              Monitor your statistic
          </Typography>
      </main>

    </div>
  )
}

export default Home
