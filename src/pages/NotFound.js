import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function NotFound() {
	const { state } = useContext(AuthContext);
	return (
		<div className="card">
			<div className="empty">
				<div className="empty-img"><img src="" alt="" height={128} />
				</div>
				<p className="empty-title">Not found</p>
				{/* <p className="empty-subtitle text-muted">
					Try adjusting your search or filter to find what you're looking for.
				</p> */}
				<div className="empty-action">
					<Link to={state.isAuth ? '/dashboard' : '/'} className="btn btn-primary">
						{/* Download SVG icon from http://tabler-icons.io/i/search */}
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="5" y1="12" x2="19" y2="12"></line><line x1="5" y1="12" x2="9" y2="16"></line><line x1="5" y1="12" x2="9" y2="8"></line></svg>
						Help Please
					</Link>
				</div>
			</div>
		</div>

	)
}
