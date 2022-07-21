import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import Loader from "../components/Loader";
import config from "../config";

export default function Login() {
  const navigate = useNavigate();
  const { dispatch, setAlerts } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
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
      const body = await res.json();
      if (res.ok) {
        setAlerts(alerts => [...alerts, { type: 'info', title: 'Email Accepted!', text: body.data }]);
        setReset(true);
      }
      else
        setAlerts(alerts => [...alerts, { type: 'warning', title: 'Login Issue!', text: body.error }]);
    } catch (error) {
      setAlerts(alerts => [...alerts, { type: 'danger', title: 'Network Issue!', text: error.message }]);
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
      const body = await res.json();
      if (res.ok) {
        dispatch({
          type: "LOGIN",
          payload: body.data,
        });
        setAlerts(alerts => [...alerts, { type: 'success', title: 'OTP Verified!', text: 'Next add your whatsapp' }]);
        navigate('/dashboard');
      }
      else if (res.status !== 401) {
        dispatch({ type: "LOGOUT" });
        setAlerts(alerts => [...alerts, { type: 'danger', title: 'OTP Incorrect!', text: body.error }]);
        setReset(false);
      } else
        setAlerts(alerts => [...alerts, { type: 'warning', title: 'OTP Issue!', text: body.error }]);
    } catch (error) {
      setAlerts(alerts => [...alerts, { type: 'danger', title: 'Network Issue!', text: error.message }]);
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
      setAlerts(alerts => [...alerts, { type: 'info', title: 'OTP Resent!', text: 'Check your email' }]);
    } catch (error) {
      setAlerts(alerts => [...alerts, { type: 'danger', title: 'Network Issue!', text: error.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page page-center">
      <div className="container-tight py-4">
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
    </div >
  );
}
