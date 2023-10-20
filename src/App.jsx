import { useState } from "react";
import employes from "./data";
import "./App.css";
import {
	Container,
	Row,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	List,
} from "reactstrap";

function App() {
	const [selectedCity, setSelectedCity] = useState("");
	const [selectedWorkShop, setSelectedWorkShop] = useState("");
	const [selectedWorkShift, setSelectedWorkShift] = useState("");
	const selectedEmployes = employes
		.filter(
			({ city, workshop, team }) =>
				city === selectedCity &&
				workshop === selectedWorkShop &&
				team === selectedWorkShift
		)
		.map(({ surname, name }) => {
			return { surname, name };
		});
	selectedEmployes.length
		? (document.cookie = `${selectedCity} ${selectedWorkShop} ${selectedWorkShift}= ${JSON.stringify(
				selectedEmployes.map(({ surname, name }) => `${surname} ${name}`)
		  )}; expires= ${new Date(
				new Date().setHours(new Date().getHours() + 1)
		  )}; path=/`)
		: null;

	return (
		<Container>
			<Row>
				<Col className="bg-light border">
					<Form>
						<FormGroup>
							<Label for="citySelect">Город</Label>
							<Input
								id="citySelect"
								name="select"
								type="select"
								value={selectedCity}
								onChange={(e) => setSelectedCity(e.target.value)}
							>
								<option value="">Выберите город</option>
								<option value={"msk"}>МСК</option>
								<option value={"spb"}>СПБ</option>
							</Input>
						</FormGroup>

						<FormGroup>
							<Label for="workShopSelect">Номер цеха</Label>
							<Input
								id="workShopSelect"
								name="select"
								type="select"
								value={selectedWorkShop}
								onChange={(e) => setSelectedWorkShop(e.target.value)}
							>
								<option value="">Выберите цех</option>
								{employes
									.filter((employee) => employee.city === selectedCity)
									.filter(
										(employee, index, self) =>
											index ===
											self.findIndex((o) => o.workshop === employee.workshop)
									)
									.map(({ workshop }, index) => (
										<option
											key={index}
											value={workshop}
										>
											Цех №{index + 1}
										</option>
									))}
							</Input>
						</FormGroup>

						<FormGroup tag="fieldset">
							<legend>Рабочая смена</legend>
							<FormGroup check>
								<Label check>
									<Input
										name="radio1"
										type="radio"
										value="dayShift"
										onChange={(e) => setSelectedWorkShift(e.target.value)}
									/>{" "}
									первая с 8:00 до 20:00
								</Label>
							</FormGroup>
							<FormGroup check>
								<Label check>
									<Input
										name="radio1"
										type="radio"
										value="nightShift"
										onChange={(e) => setSelectedWorkShift(e.target.value)}
									/>{" "}
									вторая с 20:00 до 8:00
								</Label>
							</FormGroup>
						</FormGroup>
					</Form>
				</Col>
			</Row>
			<Row>
				<Col>
					<h4>Состав бригады</h4>
					<List>
						{selectedEmployes.map(({ surname, name }, index) => (
							<li key={index}>{`${surname} ${name}`}</li>
						))}
					</List>
				</Col>
			</Row>
		</Container>
	);
}
export default App;
