import Footer from "@/components/Footer";
import PetNestNavbar from "@/components/Navbar";
import { Josefin_Sans } from "next/font/google";


const josefin = Josefin_Sans({ 
  subsets: ["latin"],
  variable: "--font-josefin",
});
const MainLayout = ({children}) => {
    return (
        <div className={josefin.className}>
            <PetNestNavbar/>
            {children}
            <Footer/>
            
        </div>
    );
};

export default MainLayout;