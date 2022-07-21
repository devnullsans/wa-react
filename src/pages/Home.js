import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Home() {
	const { state, dispatch } = useContext(AuthContext);
	return (
		<div>Home Page Design Pending</div>
	)
}
