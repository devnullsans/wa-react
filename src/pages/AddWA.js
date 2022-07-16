import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import NavBar from "../components/NavBar";
import config from "../config";

export default function AddWA(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [qr, setQr] = useState("");
  const [bid, setBid] = useState(state ?? "");
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);

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
        else
          setAlerts([...alerts, { type: 'warning', title: 'Server Issue!', text: body.error }]);
      } catch (error) {
        setAlerts([...alerts, { type: 'danger', title: 'Network Issue!', text: error.message }]);
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
        const { qr, state } = body.data;
        if (state === 'unauth') {
          setQr(qr);
          // timeout is leaky !!!
          setTimeout(() => fetchQR(), 4e3);
          // check Network > go to /addwa > dont verify qr > back to dash > qr is still requested
        } else {
          setQr("");
          setAlerts([...alerts, { type: 'success', title: 'Whatsapp Connected!', text: '' }]);
        }
      }
      else {
        setQr("");
        setAlerts([...alerts, { type: 'warning', title: 'Server Issue!', text: body.error }]);
      }
    } catch (error) {
      setAlerts([...alerts, { type: 'danger', title: 'Network Issue!', text: error.message }]);
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
            {Boolean(qr) ? (<QRCode value={qr} />) : (<p>Please Wait ...</p>)}
          </div>
        </div>
        <Alert list={alerts} setList={setAlerts} />
        <Footer />
      </div>
    </>
  );
}
