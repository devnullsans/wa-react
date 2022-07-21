import { useEffect } from "react";

export default function Alert({ list, setList }) {
	useEffect(() => {
		if (list.length === 0) return undefined;
		const tid = setTimeout(() => setList(l => l.slice(1)), 5e3);
		return () => clearTimeout(tid);
	}, [list, setList]);
	return (
		<div className="notification-container bottom-right">
			{list?.map((toast, i) => <Toast key={i} type={toast?.type} title={toast?.title} text={toast?.text} />)}
		</div>
	);
};

export function Toast({ type, title, text }) {
	return (
		<div className={`alert alert-${type}`} role="alert">
			<h4 className="alert-title">{title}</h4>
			<div className="text-muted">{text}</div>
		</div>
	);
};

Toast.defaultProps = {
	type: 'info',
	title: '',
	text: ''
};
