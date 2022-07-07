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
  const [data, setData] = useState({});
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
        if (res.ok) {
          console.log(body.data);
          setNumbers(body.data);
        }
      } catch (error) {
        setAlerts([...alerts, { type: 'danger', title: 'Server Issue!', text: error.message }]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSend = async () => {
    try {
      const res = await fetch(`${config.API_URL}/bot/go`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('auth'),
          body: JSON.stringify()
        }
      });
      if (res.ok) {
        // 
      } else {
        // 
      }
    } catch (error) {
      setAlerts([...alerts, { type: 'danger', title: 'Server Issue!', text: error.message }]);
    }
  };

  const handleChange = e => {
    console.log('handleChange', e.target.name, e.target.value);
    setData(d => ({...d, [e.target.name]: e.target.value}));
  }; console.log('dataReflect', data);
  
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
                    <select className="form-select tomselected ts-hidden-accessible" name="sender" value={data.sender} onChange={handleChange} required>
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
                    <textarea className="form-control" rows={3} name="receivers" value={data.receivers} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label required">
                      Delay
                      <span className="form-label-description">40 sec</span>
                    </label>
                    <input type="range" className="form-range mb-2" min={5} max={55} step={5} name="delay" value={data.delay} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label required">
                      Batch
                      <span className="form-label-description">1 sec</span>
                    </label>
                    <input type="range" className="form-range mb-2" min={1} max={5} step={1} name="batch" value={data.batch} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <div className="form-label">Image</div>
                    <input type="file" accept="image/*" className="form-control" name="image" value={data.image} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" rows={2} />
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
