import { Link } from "react-router-dom";
import Alert from "./Alert";
import Loader from "./Loader";
import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";

export default function Dashboard(props) {
	const [loading, setLoading] = useState(false);
	const [alerts, setAlerts] = useState([]);
	const [cards, setCards] = useState([]);
	const [stores, setStores] = useState([]);
	const [till, setTill] = useState(new Date());

	return (
		<>
			<Header />
			<NavBar link="dashboard" />
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
										<div className="d-flex align-items-center mb-3">
											<div className="subheader">Validity Left</div>
										</div>
										<div className="h1">state.user?.validity Days</div>
										<div className="text-muted">Till: {till.toLocaleDateString()}</div>
									</div>
								</div>
							</div>

							<div className="col-sm-3 col-lg-3">
								<div className="card">
									<div className="card-body">
										<div className="d-flex align-items-center mb-3">
											<div className="subheader">Referrer Code</div>
										</div>
										<div className="h1">state.user?.ref_code</div>
										<div className="text-muted">Refer and get 90 days more</div>
									</div>
								</div>
							</div>

							<div className="col-sm-3 col-lg-3">
								<div className="card">
									<div className="card-body">
										<div className="d-flex align-items-center mb-3">
											<div className="subheader">Business Cards</div>
										</div>
										<div className="h1">{cards.length}</div>
										<Link className="btn btn-sm btn-white" to="/cards">Show details</Link>
									</div>
								</div>
							</div>
							<div className="col-sm-3 col-lg-3">
								<div className="card">
									<div className="card-body">
										<div className="d-flex align-items-center mb-3">
											<div className="subheader">Whatsapp Stores</div>
										</div>
										<div className="h1">{stores.length}</div>
										<Link className="btn btn-sm btn-white" to="/stores">Show details</Link>
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
