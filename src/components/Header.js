import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";


export default function Header(props) {
	const { state, dispatch } = useContext(AuthContext);
	return (
		<header className="navbar navbar-expand-md navbar-light d-print-none">
			<div className="container-xl">
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbar-menu"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
					<Link to={state.isAuth ? '/dashboard' : '/'}>
						<img
							src={`${process.env.PUBLIC_URL}/logo.png`}
							alt="SteupCard"
							width="110"
							height="32"
							className="navbar-brand-image"
						/>
					</Link>
				</h1>
				<div className="navbar-nav flex-row order-md-last">
					<Link to="/" className="" onClick={e => dispatch({ type: "LOGOUT" })}>
						Logout
					</Link>
				</div>
			</div>
		</header>
	);
}
