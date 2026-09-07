import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const PublicLayout = () => {
    return (
        <div className="app-layout">
            <Navbar />

            <main className="main-content">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default PublicLayout;