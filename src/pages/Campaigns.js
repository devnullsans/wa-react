import { useState, useEffect, useContext } from "react";
import Loader from "../components/Loader";
import config from "../config";
import { AuthContext } from "../AuthContext";

export default function Campaigns() {
  const { setAlerts } = useContext(AuthContext);
  const [mid, setMid] = useState("");
  const [messages, setMessages] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${config.API_URL}/bot/msgs`, {
          method: 'GET',
          headers: {
            'Authorization': localStorage.getItem('auth')
          }
        });
        const body = await res.json();
        if (res.ok) {
          console.log(body.data);
          setMessages(body.data);
        } else {
          setAlerts(alerts => [...alerts, { type: 'warning', title: 'Server Issue!', text: body.error }]);
        }
      } catch (error) {
        setAlerts(alerts => [...alerts, { type: 'danger', title: 'Network Issue!', text: error.message }]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onGet = async (e) => {
    const mid = e.target.value;
    console.log(mid);
    try {
      setLoading(true);
      const res = await fetch(`${config.API_URL}/bot/rcvs/${mid}`, {
        method: 'GET',
        headers: { 'Authorization': localStorage.getItem('auth') }
      });
      const body = await res.json();
      if (res.ok) {
        console.log(body.data);
        setMid(mid);
        setMessage(body.data.message);
        setReceivers(body.data.receivers);
      }
      else {
        setAlerts(alerts => [...alerts, { type: 'warning', title: 'Server Issue!', text: body.error }]);
      }
    } catch (error) {
      setAlerts(alerts => [...alerts, { type: 'danger', title: 'Network Issue!', text: error.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            <div className="col-sm-12 col-lg-12">
              <div className="card p-4">
                <div className="mb-3">
                  <label className="form-label">Select Campaign</label>
                  <select className="form-select" value={mid} onChange={onGet}>
                    <option value="">All Campaign</option>
                    {messages.map(({ id, name }) => (<option key={id} value={id}>{name}</option>))}
                  </select>
                </div>
              </div>
            </div>
            {Boolean(mid) && (
              <div className="col-sm-12 col-lg-12">
                <div className="card p-4">
                  <div className="card-header">
                    <div className="list-group list-group-flush">
                      <div className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="avatar avatar-md" style={{ backgroundImage: `url(${message?.file})` }}>{Boolean(message?.file) || 'N/A'}</span>
                          </div>
                          <div className="col text-truncate">
                            <div className="text-reset d-block">{message?.number}</div>
                            <div className="d-block text-muted text-truncate mt-n1">{message?.text || 'N/A'}</div>
                          </div>
                          <div className="col-auto">
                            <span className="list-group-item-actions">
                              {message?.status === 0 && <span className="badge bg-gray">Pending</span>}
                              {message?.status === 1 && <span className="badge bg-green">Finished</span>}
                              {message?.status === -1 && <span className="badge bg-red">Failed</span>}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <table className="table card-table table-vcenter text-nowrap datatable">
                      <thead>
                        <tr>
                          <th>Number</th>
                          <th>Last Update</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {receivers.map(({ id, number, status, sts }) => (
                          <tr key={id}>
                            <td><span className="flag flag-country-in" />{number}</td>
                            <td>{new Date(sts).toLocaleString()}</td>
                            <td>
                              {status === 0 && <span className="badge bg-secondary">Pending</span>}
                              {status === 1 && <span className="badge bg-success">Sent</span>}
                              {status === -1 && <span className="badge bg-danger">Failed</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div >
    </>
  );
}
