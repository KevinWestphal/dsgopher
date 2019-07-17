import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	html {
	  background: url(http://tavannaya.ru/wp-content/uploads/2015/07/zapah_iz_stiralnoy_mashiny_2.jpg) no-repeat center center fixed;
	  -webkit-background-size: cover;
	  -moz-background-size: cover;
	  -o-background-size: cover;
	  background-size: cover;
	}

	body {
		margin: 0;
    	padding: 0;
    	font-size: 20px;
    	font-family: "Courier New", Courier, monospace;
	}

	p {
		width: 70%;
		padding: 10px 33px;
		background: #000000;
		color: #eeeeee;
	}

	input {
		font-size: 20px;
		font-family: "Courier New", Courier, monospace;
		border: none;
		padding: 10px 33px;
		color: #eeeeee;
		cursor: text;
		font-size: 20px;
		font-weight: 300;
		text-align: left;
		background: #000000;

		&:active
	}

	button {
		font-size: 20px;
		font-weight: 500;
		font-family: "Courier New", Courier, monospace;
		border: none;
		padding: 10px 33px;
		color: #2C2C2C;
		text-align: center;
		background: #FFD500;
	}

	button:hover {
	    background-color: #FFD100;
	    color: #292929;
	}

	button:disabled,
		button[disabled]{
		background-color: #725F00;
	}
`;

export default GlobalStyle;