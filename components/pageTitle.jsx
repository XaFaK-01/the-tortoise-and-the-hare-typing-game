import React from "react"
import Head from "next/head"
// eslint-disable-next-line react/prop-types
export default function PageTitle({ title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/images/icon.png" />
      </Head>
    </>
  )
}
