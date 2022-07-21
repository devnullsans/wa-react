import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import QRCode from "react-qr-code";
import Loader from "../components/Loader";
import config from "../config";
import { AuthContext } from "../AuthContext";

export default function AddWA(props) {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { setAlerts } = useContext(AuthContext);
	const [qr, setQr] = useState("");
	const [bid, setBid] = useState(state ?? "");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const res = await fetch(`${config.API_URL}/bot/init/${bid}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': localStorage.getItem('auth')
					}
				});
				const body = await res.json();
				if (res.ok) {
					setBid(body.data);
					console.log(body.data);
				}
				else {
					setAlerts(alerts => [...alerts, { type: 'warning', title: 'Server Issue!', text: body.error }]);
					navigate('/dashboard');
				}
			} catch (error) {
				setAlerts(alerts => [...alerts, { type: 'danger', title: 'Network Issue!', text: error.message }]);
				navigate('/dashboard');
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	useEffect(() => {
		if (bid) {
			const id = setInterval(() => fetchQR(), 4e3);
			return () => clearTimeout(id);
		}
	}, [bid]);

	const fetchQR = async () => {
		try {
			const res = await fetch(`${config.API_URL}/bot/qr/${bid}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('auth')
				}
			});
			const body = await res.json();
			if (res.ok) {
				const { qr, state } = body.data;
				if (state === 'unauth') {
					setQr(qr);
				} else {
					setQr("");
					setAlerts(alerts => [...alerts, { type: 'success', title: 'Whatsapp Connected!', text: '' }]);
					navigate('/dashboard');
				}
			} else {
				setQr("");
				setAlerts(alerts => [...alerts, { type: 'warning', title: 'Server Issue!', text: body.error }]);
				navigate('/dashboard');
			}
		} catch (error) {
			setAlerts(alerts => [...alerts, { type: 'danger', title: 'Network Issue!', text: error.message }]);
			navigate('/dashboard');
		}
	};

	return (
		<>
			<div className="page-wrapper">
				<div className="container-xl">
					<div className="page-header d-print-none">
						<div className="row align-items-center">
							<div className="col">
								<div className="page-pretitle">Add Whatsapp</div>
								<h2 className="page-title">Scan QR</h2>
							</div>
						</div>
					</div>
				</div>
				<div className="page-body">
					{loading && <Loader />}
					<div className="container-xl">
						{Boolean(qr) ? (<QRCode value={qr} />) : (<p>Please Wait ...</p>)}
					</div>
				</div>
			</div>
		</>
	);
}
