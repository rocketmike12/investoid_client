import { Header } from "../../components/Header/Header";
import { Container } from "../../components/Container/Container";
import { AddOperation } from "./AddOperation/AddOperation";
import { Operations } from "./Operations/Operations";

export const MainPage = function () {
	return (
		<>
			<Header />
			<Container style={{ padding: "0 20px" }}>
				<AddOperation />
				<Operations />
			</Container>
		</>
	);
};
