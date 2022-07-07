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
          <div className="container-xl">
            
          </div>
        </div>
        <Footer />
      </div>
      <Alert list={alerts} setList={setAlerts} />
    </>
  );
}
