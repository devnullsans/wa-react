import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "./Loader";
import Alert from "./Alert";
import config from "../config";

export default function Login() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [alerts, setAlerts] = useState([]);
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [reset, setReset] = useState(false);

	const onLoginSubmit = async (e) => {
		e.preventDefault();
		console.log(email);
		try {
			setLoading(true);
			const res = await fetch(`${config.API_URL}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});
			if (res.ok){
				setAlerts([...alerts, { type: 'info', title: 'Login Success!', text: 'Now time for OTP' }]);
				setReset(true);
			}
			else
				setAlerts([...alerts, { type: 'warning', title: 'Login Issue!', text: 'This is your fault' }]);
		} catch (error) {
			setAlerts([...alerts, { type: 'danger', title: 'Server Issue!', text: error.message }]);
		} finally {
			setLoading(false);
		}
	};

	const onOtpSubmit = async (e) => {
		e.preventDefault();
		console.log(otp, email);
		try {
			setLoading(true);
			const res = await fetch(`${config.API_URL}/auth/validate`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, otp })
			});
			if (res.ok) {
				setAlerts([...alerts, { type: 'success', title: 'OTP Verified!', text: 'Now Go to Dashboard' }]);
				navigate('/dashboard');
			}
			else if (res.status === 403) {
				
			}
			setAlerts([...alerts, { type: 'warning', title: 'OTP Issue!', text: 'This is your fault' }]);
		} catch (error) {
			setAlerts([...alerts, { type: 'danger', title: 'Server Issue!', text: error.message }]);
		} finally {
			setLoading(false);
		}
	};

	const onResendOtp = async (e) => {
		e.preventDefault();
		console.log(email);
		try {
			setLoading(true);
			const res = await fetch(`${config.API_URL}/auth/resend`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});
			setAlerts([...alerts, { type: 'info', title: 'OTP Resent!', text: 'Check your email' }]);
		} catch (error) {
			setAlerts([...alerts, { type: 'danger', title: 'Server Issue!', text: error.message }]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="page page-center">
			<div className="container-tight py-4">
				<div className="text-center mb-4">
					<Link to="/" className="navbar-brand navbar-brand-autodark"><img src={`${config.PUBLIC_URL}/logo.png`} alt="logo" height="36" /></Link>
				</div>
				{loading && <Loader />}
				{reset ? (
					<form onSubmit={onOtpSubmit} className="card card-md" autoComplete="off">
						<div className="card-body">
							<h2 className="card-title text-center mb-4">Verify OTP from your email</h2>
							<div className="mb-3">
								<label className="form-label">One Time Password (OTP)</label>
								<input type="number" value={otp} onChange={e => setOtp(e.target.value)} className="form-control" placeholder="Enter otp" required />
							</div>
							<div className="text-center text-muted mt-3">
								Didn't receive any email? <Link to="#" onClick={onResendOtp} tabIndex="-1">Resend OTP</Link>
							</div>
							<div className="card-footer">
								<button type="submit" className="btn btn-primary w-100">Submit</button>
							</div>
						</div>
					</form>
				) : (
					<form onSubmit={onLoginSubmit} className="card card-md" autoComplete="off">
						<div className="card-body">
							<h2 className="card-title text-center mb-4">Login/Register with your email</h2>
							<div className="mb-3">
								<label className="form-label">Email address</label>
								<input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Enter email" required />
							</div>
							<div className="form-footer">
								<button type="submit" className="btn btn-primary w-100">Get Started</button>
							</div>
						</div>
					</form >
				)
				}
			</div >
			<Alert list={alerts} setList={setAlerts} />
		</div >
	);
}
