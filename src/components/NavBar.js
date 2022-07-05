import { Link } from "react-router-dom";

export default function NavBar(props) {
	return (
		<div className="navbar-expand-md">
			<div className="collapse navbar-collapse" id="navbar-menu">
				<div className="navbar navbar-light">
					<div className="container-xl">
						<ul className="navbar-nav">
							<li className={props.link === 'dashboard' ? 'nav-item active' : 'nav-item'}>
								<Link className="nav-link" to="/dashboard">
									<span className="nav-link-icon d-md-none d-lg-inline-block">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="icon icon-tabler icon-tabler-app-window"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											strokeWidth="2"
											stroke="currentColor"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<rect x="3" y="5" width="18" height="14" rx="2"></rect>
											<path d="M6 8h.01"></path>
											<path d="M9 8h.01"></path>
										</svg>
									</span>
									<span className="nav-link-title">Dashboard</span>
								</Link>
							</li>
							<li className={props.link === 'cards' ? 'nav-item active' : 'nav-item'}>
								<Link className="nav-link" to="/cards">
									<span className="nav-link-icon d-md-none d-lg-inline-block">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="icon icon-tabler icon-tabler-id"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											strokeWidth="2"
											stroke="currentColor"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<rect x="3" y="4" width="18" height="16" rx="3"></rect>
											<circle cx="9" cy="10" r="2"></circle>
											<line x1="15" y1="8" x2="17" y2="8"></line>
											<line x1="15" y1="12" x2="17" y2="12"></line>
											<line x1="7" y1="16" x2="17" y2="16"></line>
										</svg>
									</span>
									<span className="nav-link-title">Cards</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
