import React from "react";
import Button from "react-bootstrap/Button";

import "./ConfirmDialog.css";

function ConfirmDialog(props) {
	return (
		<div className="confirm-dialog">
			<div className="overlay"></div>
			<div className="confirm-dialog-content">
				<div>{props.children}</div>
				<Button variant="primary" onClick={props.onConfirm}>
					Ok
				</Button>
				<Button variant="primary" onClick={props.onCancel}>
					Cancel
				</Button>
			</div>
		</div>
	);
}

export default ConfirmDialog;
