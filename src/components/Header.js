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
					<Link to="/">
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
					<div className="nav-item dropdown">
						<Link
							to="#"
							className="nav-link d-flex lh-1 text-reset p-0"
							data-bs-toggle="dropdown"
							aria-label="Open user menu"
						>
							<span
								className="avatar avatar-sm"
								style={{ color: "#ffffff", backgroundColor: "#cddc39" }}
							>{state.user?.name.split(' ').map(s => s[0].toUpperCase()).filter((_, i) => i < 2).join('')}</span>
							<div className="d-none d-xl-block ps-2">
								<div>{state.user?.name}</div>
								{/* <div className="mt-1 small text-muted">{state.user?.ref_code}</div> */}
							</div>
						</Link>
						<div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
							<Link
								to="/account"
								className="dropdown-item"
							>
								Profile &amp; account
							</Link>
							<Link
								to="/"
								className="dropdown-item"
								onClick={e => dispatch({ type: "LOGOUT" })}
							>
								Logout
							</Link>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
