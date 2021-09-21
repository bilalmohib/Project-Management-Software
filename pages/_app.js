import Head from "next/head"
import '../styles/globals.css'

import "../ContainerCss/Home.css";
import "../ContainerCss/Admin.scss";
import "../ContainerCss/Staff.css";
import "../ContainerCss/Main.css"
//Importing the styles for navigation bar.
import "../Components/Navbar/Navbar.css";

import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"

import { Provider } from 'react-redux'
import store from "../store";

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="description" content="Team Overc’s is a trusted name in the house construction and consultancy industry. With the extensive experience in the field since 2011, Team Overc’s has made a name for itself providing high quality Construction and Building services to its clientele." />
      <meta name="keywords" content="management system,teams management,task management,tasks assignement,staff manager" />
      <meta name="author" content="Muhammad-Bilal-7896" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />

      {/* Font Awesome */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet" />
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
      {/* MDB */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.5.0/mdb.min.css" rel="stylesheet" />
      {/* <!-- MDB --> */}
      <script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.5.0/mdb.min.js"
      ></script>
      <title>Staff Manager</title>
    </Head>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
}

export default MyApp
