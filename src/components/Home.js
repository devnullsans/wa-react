import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Home() {
  const { state, dispatch } = useContext(AuthContext);
	const navigate = useNavigate();
	return (
		<>
			<header className="header-area header-sticky">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<nav className="main-nav">
								<Link to="/" className="logo">
									<img src="logo.png" alt="logo" />
								</Link>
								<ul className="nav">
									<li className="scroll-to-section">
										{state.isAuth ? <a href="#" onClick={() => dispatch({ type: "LOGOUT"})}>Logout</a> : <Link to="/login">Sign In</Link>}
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</header>
			<div className="page-heading">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="header-text">
								<h2>
									Create your Digital <em>Business Card</em></h2>
								<div className="div-dec" />
								<div className="buttons my-3">
									<div className="orange-button">
										{state.isAuth ? <Link to="/dashboard">Dashboard</Link> : <Link to="/login">Get Started</Link>}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<section className="services" id="services">
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<div className="service-item">
								<i className="fas fa-archive" />
								<h4>Photo gallery</h4>
								<p>You can show case your product images on your business card.</p>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="service-item">
								<i className="fas fa-cloud" />
								<h4>Save vCard</h4>
								<p>Visitor can save your phone number as vCard file format.</p>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="service-item">
								<i className="fas fa-charging-station" />
								<h4>Services Listing</h4>
								<p>You can list your services with explaination content and enquiry button. This helps you for high chance to convert your visitor into business lead.</p>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="service-item">
								<i className="fas fa-suitcase" />
								<h4>Payment Details</h4>
								<p>You can list your all accepted payment methods in your digital business card.</p>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="service-item">
								<i className="fas fa-archway" />
								<h4>Business Hours</h4>
								<p>You can display your business opening hours. Your customer can easily understand when you are available. </p>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="service-item">
								<i className="fas fa-puzzle-piece" />
								<h4>Social Media Links</h4>
								<p>Your all social media presence in one digital business card. Stay connect with your customers. </p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<footer>
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<p>Copyright © {(new Date()).getFullYear()} SetupCard, All Rights Reserved.</p>
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}
