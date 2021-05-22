import Head from "next/head";
import { Controller } from "../src/checkup";
export default function Checkup() {
  return (
    <>
      <Head>
        <title>Checkup Funcional - RS Personal</title>
      </Head>
      <Controller />
    </>
  );
}
