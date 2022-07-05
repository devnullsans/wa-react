import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer footer-transparent d-print-none">
      <div className="container">
        <div className="row text-center align-items-center flex-row-reverse">
          <div className="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                Copyright &copy; <span id="year"></span>
                <Link
                  to="/dashboard"
                  className="link-secondary"
                >
                  SetupCard
                </Link>
                .All rights reserved.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
