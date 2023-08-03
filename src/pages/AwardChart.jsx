import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table'
import useAuthUser from '../hooks/useAuthUser';
import { useEffect, useState } from "react";
import axios from "axios";


const TABLE_HEAD = ["Category", "Reward Saver", "Standard", "Base Peak", "Premium", "Premium Peak", "Options"];


const AwardChart = () => {
    const userInfo = useAuthUser();
	const [data, setData] = useState([])
	const [dialogOpen, setDialogOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false); // Use if edit by modal
	const [currentRecord, setCurrentRecord] = useState({}); // Use if edit by modal

    const handleDialogOpen = () => setDialogOpen((currentState) => !currentState);

	useEffect(()=> {
		reloadTableData();
	}, [])

    const reloadTableData = () => {
		axios.get('http://localhost:8080/awardCharts')
		.then(res => {
			console.log(res.data)
			setData(mapData(res.data));
		})
		.catch(err => console.log(err))
	}

    const mapData = (data) => {
		let dataMapped = []

		for (let i = 0; i < data.length; i++) { // Categories
			let mapped = {}
			const currentNode = data[i]
			mapped['category'] = currentNode['category']

			if(currentNode['roomCategories'].length){ // Exists Room Categories

				// Standards
				let rewardSaver = {}
				rewardSaver['roomCategory'] = 'Standard'
				rewardSaver['pricingLevel'] = 'RewardSaver'
				rewardSaver['points'] = currentNode['roomCategories'][0]['pricingLevels'].length && currentNode['roomCategories'][0]['pricingLevels'][0] ? currentNode['roomCategories'][0]['pricingLevels'][0]['points'] : '0'
				mapped['rewardSaver'] = rewardSaver

				let standard = {}
				standard['roomCategory'] = 'Standard'
				standard['pricingLevel'] = 'Standard'
				standard['points'] = currentNode['roomCategories'][0]['pricingLevels'].length && currentNode['roomCategories'][0]['pricingLevels'][1] ? currentNode['roomCategories'][0]['pricingLevels'][1]['points'] : '0'
				mapped['standard'] = standard

				let basePeak = {}
				basePeak['roomCategory'] = 'Standard'
				basePeak['pricingLevel'] = 'BasePeak'
				basePeak['points'] = currentNode['roomCategories'][0]['pricingLevels'].length && currentNode['roomCategories'][0]['pricingLevels'][2] ? currentNode['roomCategories'][0]['pricingLevels'][2]['points'] : '0'
				mapped['basePeak'] = basePeak
				
				
				 // Premiums
				let premium = {}
				premium['roomCategory'] = 'Premium'
				premium['pricingLevel'] = 'Premium'
				premium['points'] = currentNode['roomCategories'][1]['pricingLevels'].length && currentNode['roomCategories'][1]['pricingLevels'][0] ? currentNode['roomCategories'][1]['pricingLevels'][0]['points'] : '0'
				mapped['premium'] = premium

				let premiumPeak = {}
				premiumPeak['roomCategory'] = 'Premium'
				premiumPeak['pricingLevel'] = 'PremiumPeak'
				premiumPeak['points'] = currentNode['roomCategories'][1]['pricingLevels'].length && currentNode['roomCategories'][1]['pricingLevels'][1] ? currentNode['roomCategories'][1]['pricingLevels'][1]['points'] : '0'
				mapped['premiumPeak'] = premiumPeak
			}
			
			dataMapped.push(mapped)
		}

		console.log(dataMapped);
		return dataMapped;
	}

    const initCreateDialog = () => {
		setIsEdit(false);
		handleDialogOpen();
	}

    const createSubmitionHandler = (data) => {
		console.log(data);
		axios.post('http://localhost:8080/awardCharts', data)
		.then(res => {
			console.log(res.data);
			reloadTableData();
		})
		.catch(err => {
			console.log(err);
		})
		resetValues();
	}

    const deleteHandler = (id) => {
		axios.delete('http://localhost:8080/awardCharts/' + id)
		.then(res => {
			console.log(res.data);
			reloadTableData();
		})
		.catch(err => {
			console.log(err);
		})
		resetValues();
	}

    const resetValues = () => {
		setIsEdit(false);
		setCurrentRecord({});
	}

    return (
        <Container fluid>
            <Card>
                <Card.Header as="h5">Award Chart</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        Here you can add new award charts for multiple categories.
                    </Card.Text>

                    <Button variant="dark" onClick={initCreateDialog}>CREATE</Button>
                    
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
								<th colSpan="1"></th>
								<th colSpan="3" >Standard</th>
								<th colSpan="2" >Premium</th>
							</tr>
                            <tr>
								{TABLE_HEAD.map((head, index) => (
									<th
										key={head}
										className="">
										<p>
                                            {head}
                                        </p>
									</th>
								))}
							</tr>
                        </thead>
                        <tbody>
                            {data.map(({category, rewardSaver, standard, basePeak, premium, premiumPeak }, index) => {
									const isLast = index === data.length - 1;
									const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
						
									return (
										<tr key={index}>
											<td className={classes}>
												<p>
                                                    {category}
                                                </p>
											</td>

											<td className={classes}>
                                                <p>
                                                    {rewardSaver.points}
                                                </p>
											</td>

											<td className={classes}>
                                                <p>
                                                    {standard.points}
                                                </p>
											</td>

											<td className={classes}>
                                                <p>
                                                    {basePeak.points}
                                                </p>
											</td>
											
											<td className={classes}>
                                                <p>
                                                    {premium.points}
                                                </p>
											</td>

											<td className={classes}>
                                                <p>
                                                    {premiumPeak.points}
                                                </p>
											</td>

											<td className={classes}>
                                                <Button variant="dark" onClick={() => deleteHandler(category)}>Edit</Button>
											</td>
										</tr>
									);
								})}
                        </tbody>
                    </Table>

                </Card.Body>
            </Card>
        </Container>
    )
}

export default AwardChart;
