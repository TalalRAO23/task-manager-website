import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                Task Manager
            </Link>

            {isAuthenticated ? (
                <div className="nav-right">
                    <span>Hello, {user?.name}</span>

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <div className="nav-right">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
