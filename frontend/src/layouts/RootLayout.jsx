import { Outlet, useNavigation } from 'react-router'

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Loading from "../components/Loading.jsx";
import FAQ from "../components/FAQ.jsx"

export default function RootLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
  <>
    { isLoading ? (
      <Loading/> 
    ) : (
      <>
      <Header />
      <Outlet/>
	  <FAQ />
      <Footer />
      </>
    )}
  </>
  )
}
