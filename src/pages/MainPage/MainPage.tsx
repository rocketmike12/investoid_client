import { Header } from "../../components/Header/Header";
import { AddOperation } from "./AddOperation/AddOperation";
import { Operations } from "./Operations/Operations";

export const MainPage = function () {
	return (
		<>
			<Header />
			<AddOperation />
			<Operations />
		</>
	);
};
