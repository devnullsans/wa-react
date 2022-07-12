import { useLocation } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import NavBar from "../components/NavBar";
import config from "../config";

export default function Campaigns() {
  const { state } = useLocation();
  const [message, setMessage] = useState("0");
  const [receivers, setReceivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const onGet = async (e) => {
    const msg = e.target.value;
    setMessage(msg);
    try {
      setLoading(true);
      const res = await fetch(`${config.API_URL}/bot/get/${msg}`, {
        method: 'GET',
        headers: { 'Authorization': localStorage.getItem('auth') },
      });
      const body = await res.json();
      if (res.ok)
        setReceivers(body.data);
      else
        setAlerts([...alerts, { type: 'warning', title: 'Nooooo', text: 'Why ???' }]);
    } catch (error) {
      setAlerts([...alerts, { type: 'danger', title: 'Server Issue!', text: error.message }]);
    } finally {
      setLoading(false);
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
                <div className="page-pretitle">Message Report</div>
                <h2 className="page-title">Campaigns</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="page-body">
          {loading && <Loader />}
          <div className="container">
            <div className="row row-deck row-cards">
              <div className="col-sm-12 col-lg-12">
                <div className="card p-4">
                  <select className="form-select" value={message} onChange={onGet}>
                    <option value="0">Select Campaign</option>
                    {state?.map(({ id, length, mime, sender, size, total }) => (
                      <option key={id} value={id}>{id} {sender} {mime} {size} {length} {total}</option>
                    ))}
                  </select>
                  {/* <pre>{JSON.stringify(receivers)}</pre> */}
                  {receivers.map(({ id, number, status }) => (<div key={id}>{id} {number} {status}</div>))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Alert list={alerts} setList={setAlerts} />
        <Footer />
      </div >
    </>
  );
}
