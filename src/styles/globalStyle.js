import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	html {
		margin:0;
	    background: url(http://tavannaya.ru/wp-content/uploads/2015/07/zapah_iz_stiralnoy_mashiny_2.jpg) no-repeat center center fixed;
	    -webkit-background-size: cover;
	    -moz-background-size: cover;
	    -o-background-size: cover;
	    background-size: cover;
	}

	body {
		margin: 0;
    	padding: 0;
    	font-size: 1.3rem;
    	font-family: "Courier New", Courier, monospace;
	}

	a {
		color: #eeeeee;
 		text-decoration: none;
	}

	ul {
		margin: 0;
	}

	p {
		margin-bottom: 0.4rem;
		margin-top: 0.4rem;
		padding: 1rem 2rem;
		background: #000000;
		color: #eeeeee;
	}

	h1 {
		margin-bottom: 0.4rem;
		margin-top: 0.4rem;
		padding: 1rem 2rem;
		background: #000000;
		color: #eeeeee;
	}

	table {
		width: 100%;
		border-spacing: 0rem 0.4rem;
	}

	th {
		padding: 1rem;
		background: #000000;
		color: #eeeeee;
		text-align: center;		
	}

	td {
		padding: 1rem;
		background: #000000;
		color: #eeeeee;
		text-align: center;
	}

	div.Toastify__toast {
		width: 100%;
	    overflow:hidden;
	}

	div.Toastify__toast-body {
		margin-bottom: 0.4rem;
		margin-top: 0.4rem;
		padding: 1rem 2rem;
		background: #000000;
		color: #eeeeee;
		float: left;
	}

	button.Toastify__close-button {
		height: 3.45rem;
	}

	input {
		font-size: 1.3rem;
		font-family: "Courier New", Courier, monospace;
		border: none;
		padding: 1rem 2rem;
		color: #eeeeee;
		cursor: text;
		font-size: 1.3rem;
		font-weight: 300;
		text-align: left;
		background: #000000;

		&:active
	}

	button {
		font-size: 1.3rem;
		font-weight: 500;
		margin-bottom: 0.4rem;
		margin-top: 0.4rem;
		font-family: "Courier New", Courier, monospace;
		border: none;
		padding: 1rem 2rem;
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