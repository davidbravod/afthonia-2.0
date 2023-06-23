import React, { Component } from "react";
import "../../styles/styles.css"
import "../../styles/nice-select.css"
import "../../styles/jstable.css"

export const Footer = () => {
	if (
		location.pathname === "/login" ||
		location.pathname === "/signup" ||
		location.pathname === "/signup-business" ||
		location.pathname === "/signup-owners" ||
		location.pathname === "/signup-agent" ||
		location.pathname === "/signup-ein") {
		return null;
	  }
	return (
	<footer className="footer mt-auto py-3 text-center top-border">
		<p>
			Made with <i className="fa fa-heart text-danger" /> by{" "}
			<a href="https://www.afthoniaent.com">Afthonia Enterprises LLC</a>
		</p>
	</footer>
)};
