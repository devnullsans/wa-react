import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Alert from "./Alert";
import Loader from "./Loader";
import Footer from "./Footer";
import Header from "./Header";
import config from "../config";
// import NavBar from "./NavBar";

export default function Dashboard(props) {
	const [numbers, setNumbers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alerts, setAlerts] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const res = await fetch(`${config.API_URL}/bot/all`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': localStorage.getItem('auth')
					}
				});
				const body = await res.json();
				if (res.ok) {
					console.log(body.data);
					setNumbers(body.data);
				}
			} catch (error) {
				setAlerts([...alerts, { type: 'danger', title: 'Server Issue!', text: error.message }]);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return (
		<>
			<Header />
			{/* <NavBar link="dashboard" /> */}
			<div className="page-wrapper">
				<div className="container-xl">
					<div className="page-header d-print-none">
						<div className="row align-items-center">
							<div className="col">
								<div className="page-pretitle">Overview</div>
								<h2 className="page-title">Dashboard</h2>
							</div>
						</div>
					</div>
				</div>
				<div className="page-body">
					{loading && <Loader />}
					<div className="container-xl">
						<div className="row row-deck row-cards">

							<div className="col-sm-3 col-lg-3">
								<div className="card">
									<div className="card-body">
										<div className="h1">Whatsapps</div>
										{numbers.map(({ id, number, event }) => (
											<div className="text-muted" key={id}>{number}:{event}</div>
										))}
									</div>
								</div>
							</div>

							{Boolean(numbers.length) && (
								<div className="col-sm-3 col-lg-3">
									<div className="card">
										<div className="card-body">
											<Link className="btn btn-md btn-primary" to="/sendm">Send Message</Link>
										</div>
									</div>
								</div>
							)}

							<div className="col-sm-3 col-lg-3">
								<div className="card">
									<div className="card-body">
										<Link className="btn btn-md btn-success" to="/addwa">Add Whatsapp</Link>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
				<Footer />
			</div>
			<Alert list={alerts} setList={setAlerts} />
		</>
	);
}
