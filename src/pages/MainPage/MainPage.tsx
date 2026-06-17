import { Header } from "../../components/Header/Header";
import { Background } from "./Background/Background";
import { AddOperation } from "./AddOperation/AddOperation";
import { Operations } from "./Operations/Operations";

export const MainPage = function () {
	return (
		<>
			<Header />
			<Background>
				<AddOperation />
				<Operations />
			</Background>
		</>
	);
};
