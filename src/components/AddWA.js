import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Alert from "./Alert";
import Loader from "./Loader";
import Footer from "./Footer";
import Header from "./Header";
// import NavBar from "./NavBar";
import config from "../config";

export default function AddWA(props) {
  const navigate = useNavigate();
  const [qr, setQr] = useState("");
  const [bid, setBid] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${config.API_URL}/bot/init`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')
          }
        });
        const body = await res.json();
        if (res.ok) {
          console.log(body.data);
          setBid(body.data);
        }
        else
          setAlerts([...alerts, { type: 'warning', title: 'Why?', text: 'This is your fault' }]);
      } catch (error) {
        setAlerts([...alerts, { type: 'danger', title: 'Server Issue!', text: error.message }]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (bid) fetchQR();
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
        const event = body.data.event;
        if (event === 'authenticated' || event === 'ready') navigate('/dashboard');
        else {
          setQr(body.data.qr);
          setTimeout(fetchQR, 4e3);
        }
      } 
    } catch (error) {
      setAlerts([...alerts, { type: 'danger', title: 'Server Issue!', text: error.message }]);
    }
  };

  return (
    <>
      <Header />
      {/* <NavBar link="addwa" /> */}
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
            <QRCode value={qr} />
          </div>
        </div>
        <Footer />
      </div>
      <Alert list={alerts} setList={setAlerts} />
    </>
  );
}
