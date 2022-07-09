import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Alert from "./Alert";
import Loader from "./Loader";
import Footer from "./Footer";
import Header from "./Header";
import config from "../config";
// import NavBar from "./NavBar";

export default function Dashboard(props) {
	const [senders, setSenders] = useState([]);
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
				if (res.ok)
					setSenders(body.data);
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

							<div className="col-sm-4 col-lg-4">
								<div className="card">
									<div className="card-header">
										<div className="h1">Whatsapp</div>
									</div>
									<div className="card-body d-flex flex-column justify-content-around align-items-center">
										<Link className="btn btn-md btn-success" to="/addwa">Add Whatsapp</Link>
										{Boolean(senders.length) && (
											<Link className="btn btn-md btn-primary" to="/sendm">Send Message</Link>
										)}
									</div>
								</div>
							</div>

							<div className="col-sm-4 col-lg-4">
								<div className="card">
									<div className="card-header">
										<div className="h1">Status</div>
									</div>
									<div className="list-group list-group-flush overflow-auto" style={{ maxHeight: '15rem' }}>
										{senders.map(({ id, number, event }) => (
											<div key={id} className="list-group-header">{number}:{event}</div>
										))}
									</div>
								</div>
							</div>

							<div className="col-sm-4 col-lg-4">
								<div className="card">
									<div className="card-header">
										<div className="h1">Campaigns</div>
									</div>
									<div className="list-group list-group-flush overflow-auto" style={{ maxHeight: '15rem' }}>
										{senders.filter(({ messages }) => Boolean(messages.length)).map(({ id, number, messages }) => (
											<>
												<div key={id} className="list-group-header sticky-top">{number}</div>
												{messages.map(message => (
													<div key={message.id} className="list-group-item">
														<div className="row">
															<div className="col text-truncate">
																<a href="#" className="text-body d-block">total: {message.total} sent: {message.sent} failed: {message.failed}</a>
																<div className="text-muted text-truncate mt-n1">mime: {message.mime}</div>
																<div className="text-muted text-truncate mt-n1">size: {message.size}</div>
																<div className="text-muted text-truncate mt-n1">length: {message.length}</div>
															</div>
														</div>
													</div>
												))}
											</>
										))}
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
