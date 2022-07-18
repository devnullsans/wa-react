import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import Header from "../components/Header";
import config from "../config";
// import NavBar from "./NavBar";

export default function Dashboard(props) {
	const [numbers, setNumbers] = useState([]);
	// const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alerts, setAlerts] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const res = await fetch(`${config.API_URL}/bot/dash`, {
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
					// setMessages(body.data.messages);
				} else {
					setAlerts([...alerts, { type: 'danger', title: 'Server Issue!', text: 'Need to Refresh Page.' }]);
				}
			} catch (error) {
				setAlerts([...alerts, { type: 'danger', title: 'Network Issue!', text: error.message }]);
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

							<div className="col-sm-6 col-lg-6">
								<div className="card">
									<div className="card-header">
										<div className="h1">Whatsapp</div>
									</div>
									<div className="card-body d-flex flex-column justify-content-around align-items-center">
										<Link className="my-2 btn btn-md btn-success" to="/addwa" >Add Whatsapp</Link>
										{Boolean(numbers.length) && (
											<Link className="my-2 btn btn-md btn-primary" to="/sendm" state={numbers}>Send Message</Link>
										)}
										{/* {Boolean(messages.length) && ( */}
										<Link className="my-2 btn btn-md btn-secondary" to="/cmprpt">Report</Link>
										{/* )} */}
									</div>
								</div>
							</div>

							<div className="col-sm-6 col-lg-6">
								<div className="card">
									<div className="card-header">
										<div className="h1">Status</div>
									</div>
									<div className="list-group list-group-flush overflow-auto" style={{ maxHeight: '15rem' }}>
										{numbers.map(({ id, number, event }) => (
											<div key={id} className="list-group-header">
												{number}:{event}
												{event === 'unauth' && (
													<Link className="btn btn-sm btn-primary" to="/addwa" state={String(id)}>Re Connect</Link>
												)}
											</div>
										))}
									</div>
								</div>
							</div>
							{/* 
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
							*/}
						</div>
					</div>
				</div>
				<Alert list={alerts} setList={setAlerts} />
				<Footer />
			</div>
		</>
	);
}
