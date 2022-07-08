import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Alert from "./Alert";
import Loader from "./Loader";
import Footer from "./Footer";
import Header from "./Header";
// import NavBar from "./NavBar";
import config from "../config";

export default function SendM(props) {
  const navigate = useNavigate();
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${config.API_URL}/bot/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')
          }
        });
        const body = await res.json();
        if (res.ok)
          setNumbers(body.data);
      } catch (error) {
        setAlerts([...alerts, { type: 'danger', title: 'Server Issue!', text: error.message }]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSend = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const receivers = data.get('receivers');
    data.delete('receivers');
    receivers.split(',').forEach(r => data.append('receivers', r));
    // if (!data.has('media') && !data.has('text')) {
    //   setAlerts([...alerts, { type: 'warning', title: 'No message to send', text: 'Either choose image or enter message' }]);
    // }
    try {
      const res = await fetch(`${config.API_URL}/bot/send`, {
        method: 'POST',
        headers: { 'Authorization': localStorage.getItem('auth') },
        body: data
      });
      if (res.ok) {
        setAlerts([...alerts, { type: 'success', title: 'Form Data posted', text: 'Yeeee' }]);
      } else {
        setAlerts([...alerts, { type: 'warning', title: 'Nooooo', text: 'Why ???' }]);
      }
    } catch (error) {
      setAlerts([...alerts, { type: 'danger', title: 'Server Issue!', text: error.message }]);
    }
  };

  // const handleChange = e => {
  //   console.log('handleChange', e.target.name, e.target.value, e.target.type);
  //   setData(d => ({ ...d, [e.target.name]: e.target.type == 'file' ? e.target.files.item(0) : e.target.value }));
  // };

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
                      {numbers.map(({ id, number }) => (
                        <option key={id} value={id}>{number}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label required">
                      Receiver
                      <span className="form-label-description">CSL</span>
                    </label>
                    <textarea className="form-control" rows={3} name="receivers" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label required">
                      Delay
                      <span className="form-label-description">x sec</span>
                    </label>
                    <input type="range" className="form-range mb-2" min={5} max={55} step={5} defaultValue={30} name="delay" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label required">
                      Batch
                      <span className="form-label-description">x sec</span>
                    </label>
                    <input type="range" className="form-range mb-2" min={1} max={5} step={1} defaultValue={1} name="batch" required />
                  </div>
                  <div className="mb-3">
                    <div className="form-label">Image</div>
                    <input type="file" accept="image/*" className="form-control" name="media" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
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
        <Footer />
      </div >
      <Alert list={alerts} setList={setAlerts} />
    </>
  );
}
