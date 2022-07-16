import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import NavBar from "../components/NavBar";
import config from "../config";

export default function SendM() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [delay, setDelay] = useState(20);
  const [batch, setBatch] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const onSend = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    // if (!data.get('media')?.size && !data.get('text')) {
    //   return setAlerts([...alerts, { type: 'warning', title: 'No message to send', text: 'Either choose image or enter message' }]);
    // }
    const sender = data.get('sender');
    data.delete('sender');
    const receivers = data.get('receivers[]');
    data.delete('receivers[]');
    receivers.split(',')
      .filter(r => /\d+/g.test(r))
      .map(r => r.replace(/\D+/g, '').replace(/^0+/g, ''))
      .map(r => r.length > 10 ? r : `91${r}`)
      .forEach(r => data.append('receivers[]', r));
    try {
      setLoading(true);
      const res = await fetch(`${config.API_URL}/bot/send/${sender}`, {
        method: 'POST',
        headers: { 'Authorization': localStorage.getItem('auth') },
        body: data
      });
      const body = await res.json();
      if (res.ok)
        setAlerts([...alerts, { type: 'success', title: 'Message Accepted!', text: body.data }]);
      else
        setAlerts([...alerts, { type: 'warning', title: 'Server Issue!', text: body.error }]);
    } catch (error) {
      setAlerts([...alerts, { type: 'danger', title: 'Network Issue!', text: error.message }]);
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
                <div className="page-pretitle">Send Message</div>
                <h2 className="page-title">Fill in Details</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="page-body">
          {loading && <Loader />}
          <div className="container">
            <div className="row row-deck row-cards">
              <div className="col-sm-12 col-lg-12">
                <form className="card p-4" onSubmit={onSend}>

                  <div className="mb-3">
                    <label className="form-label required">Sender</label>
                    <select className="form-select tomselected ts-hidden-accessible" name="sender" required>
                      <option value="" disabled>Select a Number</option>
                      {state?.map(({ id, number }) => (
                        <option key={id} value={id}>{number}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label required">
                      Receiver
                      <span className="form-label-description">CSL</span>
                    </label>
                    <textarea className="form-control" rows={3} name="receivers[]" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label required">
                      Delay
                      <span className="form-label-description">{delay} sec</span>
                    </label>
                    <input type="range" className="form-range mb-2" min={5} max={55} step={5} value={delay} onChange={e => setDelay(e.target.value)} name="delay" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label required">
                      Batch
                      <span className="form-label-description">{batch} at once</span>
                    </label>
                    <input type="range" className="form-range mb-2" min={1} max={5} step={1} value={batch} onChange={e => setBatch(e.target.value)} name="batch" required />
                  </div>
                  <div className="mb-3">
                    <div className="form-label">Image</div>
                    <input type="file" accept="image/*" className="form-control" name="media" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Message
                      <span className="form-label-description">
                        <label className="form-check">
                          <input className="form-check-input" type="checkbox" name="caption" />
                          <span className="form-check-label">As Caption</span>
                        </label>
                      </span>
                    </label>
                    <textarea className="form-control" rows={2} name="text" />
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-between">
                      <button type="reset" className="btn btn-secondary">Reset</button>
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </form>
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
